"""
RailGuard AI - Railway Platform Risk Analysis and Guidance System
Flask Backend Application
"""

import os
import csv
import sqlite3
from datetime import datetime, timedelta
from flask import Flask, render_template, request, jsonify, redirect, url_for, session
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.secret_key = os.environ.get('SECRET_KEY', 'railguard_secret_capstone_2026')

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATA_DIR = os.path.join(BASE_DIR, 'data')
DB_PATH = os.path.join(DATA_DIR, 'railguard.db')
CSV_PATH = os.path.join(DATA_DIR, 'train_platforms.csv')

os.makedirs(DATA_DIR, exist_ok=True)

# Default admin credentials for prototype
DEFAULT_ADMIN_USER = 'admin'
DEFAULT_ADMIN_HASH = generate_password_hash('admin123')


def get_db_connection():
    """Create a connection to SQLite with row factory."""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    """Ensure tables exist and seed sample dataset if database is empty."""
    conn = get_db_connection()
    cursor = conn.cursor()

    # Trains and platforms table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS trains (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            train_number TEXT NOT NULL,
            train_name TEXT NOT NULL,
            station TEXT NOT NULL,
            station_code TEXT DEFAULT '',
            platform INTEGER NOT NULL,
            departure_time TEXT NOT NULL,
            walk_minutes INTEGER NOT NULL DEFAULT 5,
            crowd_level TEXT NOT NULL DEFAULT 'Medium',
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            UNIQUE(train_number, station)
        )
    ''')

    # Admins table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS admins (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL
        )
    ''')

    cursor.execute('SELECT id FROM admins WHERE username = ?', (DEFAULT_ADMIN_USER,))
    if not cursor.fetchone():
        cursor.execute(
            'INSERT INTO admins (username, password_hash) VALUES (?, ?)',
            (DEFAULT_ADMIN_USER, DEFAULT_ADMIN_HASH)
        )

    # Seed from CSV if empty
    cursor.execute('SELECT COUNT(*) as cnt FROM trains')
    count = cursor.fetchone()['cnt']
    if count == 0 and os.path.exists(CSV_PATH):
        try:
            with open(CSV_PATH, 'r', encoding='utf-8') as f:
                reader = csv.DictReader(f)
                for row in reader:
                    cursor.execute('''
                        INSERT OR IGNORE INTO trains
                        (train_number, train_name, station, station_code, platform, departure_time, walk_minutes, crowd_level)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
                    ''', (
                        row['train_number'].strip(),
                        row['train_name'].strip(),
                        row['station'].strip(),
                        row.get('station_code', '').strip(),
                        int(row['platform'].strip()),
                        row['departure_time'].strip(),
                        int(row.get('walk_minutes', 5)),
                        row.get('crowd_level', 'Medium').strip()
                    ))
            conn.commit()
            print("[INFO] Seeded database from train_platforms.csv")
        except Exception as e:
            print(f"[ERROR] Could not seed database: {e}")

    conn.commit()
    conn.close()


def calculate_minutes_remaining(departure_time_str):
    """
    Calculate minutes remaining until scheduled departure time (HH:MM).
    Keeps simulation realistic (10 to 90 min) even for late-night academic demonstrations.
    """
    try:
        now = datetime.now()
        dep_hour, dep_minute = map(int, departure_time_str.split(':'))
        departure_dt = now.replace(hour=dep_hour, minute=dep_minute, second=0, microsecond=0)

        if departure_dt < now:
            departure_dt += timedelta(days=1)

        diff = departure_dt - now
        minutes_remaining = int(diff.total_seconds() // 60)

        # For academic testing at any time of day, simulate a realistic window
        if minutes_remaining > 180:
            minutes_remaining = (minutes_remaining % 60) + 15

        return max(5, minutes_remaining)
    except Exception:
        return 25


def perform_rule_based_risk_analysis(is_match, current_plat, assigned_plat, base_walk, crowd_level, minutes_remaining):
    """
    Transparent Rule-Based Risk Engine:
    Evaluates risk based on platform difference, walking distance, crowd delays, and time remaining.
    """
    if is_match:
        estimated_walk = 0
        risk_level = 'Low'
        summary = "You are already on the correct assigned platform. No transfer needed."
        return risk_level, estimated_walk, summary

    # Walk time calculation: Base walking + 1.5 min per platform gap + crowd delay
    platform_gap = abs(current_plat - assigned_plat)
    walk_estimate = base_walk + int(platform_gap * 1.5)

    if crowd_level.lower() == 'high':
        walk_estimate += 3
    elif crowd_level.lower() == 'low':
        walk_estimate = max(2, walk_estimate - 1)

    safety_margin = minutes_remaining - walk_estimate

    if safety_margin < 5:
        risk_level = 'High'
        summary = f"CRITICAL: Only {minutes_remaining} minutes remaining for an estimated {walk_estimate} minute walk through {crowd_level} crowd!"
    elif safety_margin <= 15:
        risk_level = 'Medium'
        summary = f"CAUTION: Limited time buffer ({minutes_remaining} mins) for estimated {walk_estimate} minute walk to Platform {assigned_plat}."
    else:
        risk_level = 'Low'
        summary = f"MANAGEABLE: Sufficient time buffer ({minutes_remaining} mins) to walk ~{walk_estimate} mins to Platform {assigned_plat}."

    return risk_level, walk_estimate, summary


def generate_guidance_steps(is_match, current_plat, assigned_plat, walk_estimate, language='en'):
    """Generate localized step-by-step walking guidance in English or Hindi."""
    steps = []
    if language == 'hi':
        if is_match:
            steps.append(f"आप पहले से ही सही प्लेटफॉर्म {assigned_plat} पर हैं।")
            steps.append("कृपया प्लेटफॉर्म पर लगे कोच इंडिकेटर बोर्ड पर अपने डिब्बे (Coach) की स्थिति देखें।")
            steps.append("ट्रेन के आगमन तक प्लेटफॉर्म की पीली सुरक्षा रेखा के पीछे खड़े रहें।")
        else:
            steps.append(f"प्लेटफॉर्म {current_plat} पर निकटतम पैदल उपरिगामी पुल (FOB), लिफ्ट या एस्केलेटर की ओर बढ़ें।")
            steps.append(f"उपरिगामी पुल के माध्यम से प्लेटफॉर्म {assigned_plat} की ओर जाएं। (अनुमानित पैदल समय: ~{walk_estimate} मिनट)")
            steps.append(f"प्लेटफॉर्म {assigned_plat} पर पहुंचकर ओवरहेड इलेक्ट्रॉनिक डिस्प्ले बोर्ड से ट्रेन की पुष्टि करें।")
    else:
        if is_match:
            steps.append(f"You are currently on the assigned Platform {assigned_plat}.")
            steps.append("Locate your coach position on the electronic overhead indicators.")
            steps.append("Stand behind the yellow safety line until the train comes to a complete halt.")
        else:
            steps.append(f"Head immediately to the nearest Foot Overbridge (FOB), lift, or escalator on Platform {current_plat}.")
            steps.append(f"Cross over towards Platform {assigned_plat}. (Estimated walk: ~{walk_estimate} mins).")
            steps.append(f"Once at Platform {assigned_plat}, confirm your coach position on the platform display screen.")

    return steps


# ------------------------
# Passenger Web Routes
# ------------------------

@app.route('/')
def index():
    """Passenger Verification Interface"""
    return render_template('index.html')


@app.route('/api/check-platform', methods=['POST'])
def check_platform():
    """
    Passenger Verification & Risk API
    Expects JSON: { train, station, current_platform, language }
    """
    data = request.get_json() or {}
    train_query = str(data.get('train', '')).strip()
    station_query = str(data.get('station', '')).strip()
    current_plat = data.get('current_platform')
    language = data.get('language', 'en')

    if not train_query or current_plat is None:
        return jsonify({'success': False, 'error': 'Please provide train number and your current platform.'}), 400

    try:
        current_plat = int(current_plat)
    except ValueError:
        return jsonify({'success': False, 'error': 'Platform must be an integer number.'}), 400

    conn = get_db_connection()
    cursor = conn.cursor()

    # Step 1: Flexible search matching train number or name AND station or station code
    record = None
    if station_query:
        cursor.execute('''
            SELECT * FROM trains
            WHERE (LOWER(train_number) = LOWER(?) OR LOWER(train_name) LIKE LOWER(?))
              AND (LOWER(station) LIKE LOWER(?) OR LOWER(station_code) = LOWER(?))
            LIMIT 1
        ''', (train_query, f"%{train_query}%", f"%{station_query}%", station_query))
        record = cursor.fetchone()

    # Step 2: If station wasn't specified or didn't match, fallback to train number alone
    if not record:
        cursor.execute('''
            SELECT * FROM trains
            WHERE (LOWER(train_number) = LOWER(?) OR LOWER(train_name) LIKE LOWER(?))
            LIMIT 1
        ''', (train_query, f"%{train_query}%"))
        record = cursor.fetchone()

    conn.close()

    if not record:
        return jsonify({
            'success': False,
            'error': f"Train '{train_query}' not found in database. Please check available train numbers (e.g. 12951, 12004, 22436)."
        }), 404

    assigned_plat = record['platform']
    is_match = (current_plat == assigned_plat)
    minutes_rem = calculate_minutes_remaining(record['departure_time'])
    base_walk = record['walk_minutes']
    crowd_lvl = record['crowd_level']

    # Rule-Based Risk Engine
    risk_level, estimated_walk, summary = perform_rule_based_risk_analysis(
        is_match=is_match,
        current_plat=current_plat,
        assigned_plat=assigned_plat,
        base_walk=base_walk,
        crowd_level=crowd_lvl,
        minutes_remaining=minutes_rem
    )

    # Guidance
    guidance = generate_guidance_steps(
        is_match=is_match,
        current_plat=current_plat,
        assigned_plat=assigned_plat,
        walk_estimate=estimated_walk,
        language=language
    )

    return jsonify({
        'success': True,
        'train_number': record['train_number'],
        'train_name': record['train_name'],
        'station': record['station'],
        'assigned_platform': assigned_plat,
        'current_platform': current_plat,
        'is_match': is_match,
        'departure_time': record['departure_time'],
        'minutes_remaining': minutes_rem,
        'estimated_walk_minutes': estimated_walk,
        'crowd_level': crowd_lvl,
        'risk_level': risk_level,
        'risk_summary': summary,
        'guidance': guidance,
        'model_used': 'Transparent Rule-Based Baseline Engine'
    })


# ------------------------
# Admin Dashboard Routes
# ------------------------

@app.route('/admin')
def admin_dashboard():
    """Admin Management Dashboard"""
    logged_in = session.get('admin_logged_in', False)
    records = []
    if logged_in:
        conn = get_db_connection()
        records = conn.execute('SELECT * FROM trains ORDER BY station, departure_time').fetchall()
        conn.close()
    return render_template('admin.html', logged_in=logged_in, records=records)


@app.route('/admin/login', methods=['POST'])
def admin_login():
    """Authenticate Admin"""
    username = request.form.get('username', '').strip()
    password = request.form.get('password', '').strip()

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM admins WHERE username = ?', (username,))
    admin = cursor.fetchone()
    conn.close()

    if admin and check_password_hash(admin['password_hash'], password):
        session['admin_logged_in'] = True
        session['admin_user'] = username
        return redirect(url_for('admin_dashboard'))

    return render_template('admin.html', logged_in=False, auth_error='Invalid username or password')


@app.route('/admin/logout')
def admin_logout():
    """Logout Admin"""
    session.clear()
    return redirect(url_for('admin_dashboard'))


@app.route('/admin/save-train', methods=['POST'])
def admin_save_train():
    """Add or Update a train platform record"""
    if not session.get('admin_logged_in'):
        return redirect(url_for('admin_dashboard'))

    train_num = request.form.get('train_number', '').strip()
    train_name = request.form.get('train_name', '').strip()
    station = request.form.get('station', '').strip()
    station_code = request.form.get('station_code', '').strip()
    platform = int(request.form.get('platform', 1))
    dep_time = request.form.get('departure_time', '').strip()
    walk_min = int(request.form.get('walk_minutes', 5))
    crowd = request.form.get('crowd_level', 'Medium').strip()

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO trains (train_number, train_name, station, station_code, platform, departure_time, walk_minutes, crowd_level, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
        ON CONFLICT(train_number, station) DO UPDATE SET
            train_name = excluded.train_name,
            station_code = excluded.station_code,
            platform = excluded.platform,
            departure_time = excluded.departure_time,
            walk_minutes = excluded.walk_minutes,
            crowd_level = excluded.crowd_level,
            updated_at = CURRENT_TIMESTAMP
    ''', (train_num, train_name, station, station_code, platform, dep_time, walk_min, crowd))
    conn.commit()
    conn.close()

    return redirect(url_for('admin_dashboard'))


@app.route('/admin/delete-train/<int:record_id>', methods=['POST'])
def admin_delete_train(record_id):
    """Delete a train record"""
    if not session.get('admin_logged_in'):
        return redirect(url_for('admin_dashboard'))

    conn = get_db_connection()
    conn.execute('DELETE FROM trains WHERE id = ?', (record_id,))
    conn.commit()
    conn.close()

    return redirect(url_for('admin_dashboard'))


@app.route('/admin/import-csv', methods=['POST'])
def admin_import_csv():
    """Import dataset from uploaded CSV file"""
    if not session.get('admin_logged_in'):
        return redirect(url_for('admin_dashboard'))

    uploaded_file = request.files.get('csv_file')
    if not uploaded_file or uploaded_file.filename == '':
        return redirect(url_for('admin_dashboard'))

    try:
        lines = uploaded_file.stream.read().decode('utf-8').splitlines()
        reader = csv.DictReader(lines)
        required_cols = {'train_number', 'train_name', 'station', 'platform', 'departure_time'}

        if not required_cols.issubset(set(reader.fieldnames or [])):
            return "CSV missing required headers: train_number, train_name, station, platform, departure_time", 400

        conn = get_db_connection()
        cursor = conn.cursor()
        for row in reader:
            cursor.execute('''
                INSERT INTO trains (train_number, train_name, station, station_code, platform, departure_time, walk_minutes, crowd_level, updated_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
                ON CONFLICT(train_number, station) DO UPDATE SET
                    train_name = excluded.train_name,
                    station_code = excluded.station_code,
                    platform = excluded.platform,
                    departure_time = excluded.departure_time,
                    walk_minutes = excluded.walk_minutes,
                    crowd_level = excluded.crowd_level,
                    updated_at = CURRENT_TIMESTAMP
            ''', (
                row['train_number'].strip(),
                row['train_name'].strip(),
                row['station'].strip(),
                row.get('station_code', '').strip(),
                int(row['platform'].strip()),
                row['departure_time'].strip(),
                int(row.get('walk_minutes', 5)),
                row.get('crowd_level', 'Medium').strip()
            ))
        conn.commit()
        conn.close()
    except Exception as e:
        return f"Error parsing CSV: {e}", 500

    return redirect(url_for('admin_dashboard'))


if __name__ == '__main__':
    init_db()
    print("=" * 60)
    print("  RAILGUARD AI SERVER READY")
    print("  Local PC URL:      http://127.0.0.1:5000")
    print("  Network / Phone:   http://0.0.0.0:5000 (Use your PC's IP)")
    print("  Admin Portal:      http://127.0.0.1:5000/admin")
    print("=" * 60)
    # host='0.0.0.0' allows phones and other devices on the same network to connect
    app.run(host='0.0.0.0', port=5000, debug=True)
