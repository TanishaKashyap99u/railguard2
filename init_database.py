"""
RailGuard AI - Standalone Database Initializer
Uses only Python standard library (sqlite3, csv, os, hashlib).
No external packages required.
"""

import os
import csv
import sqlite3

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATA_DIR = os.path.join(BASE_DIR, 'data')
DB_PATH = os.path.join(DATA_DIR, 'railguard.db')
CSV_PATH = os.path.join(DATA_DIR, 'train_platforms.csv')

os.makedirs(DATA_DIR, exist_ok=True)

def initialize():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    # Create trains table
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

    # Create admins table
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS admins (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL
        )
    ''')

    # Default admin user (admin / admin123)
    cursor.execute('SELECT id FROM admins WHERE username = ?', ('admin',))
    if not cursor.fetchone():
        from werkzeug.security import generate_password_hash
        cursor.execute(
            'INSERT INTO admins (username, password_hash) VALUES (?, ?)',
            ('admin', generate_password_hash('admin123'))
        )

    # Populate from CSV
    if os.path.exists(CSV_PATH):
        with open(CSV_PATH, 'r', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            inserted = 0
            for row in reader:
                cursor.execute('''
                    INSERT OR REPLACE INTO trains
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
                inserted += 1
            print(f"[OK] Seeded {inserted} train records from train_platforms.csv into {DB_PATH}")

    conn.commit()
    conn.close()
    print("[OK] SQLite database initialized successfully!")

if __name__ == '__main__':
    initialize()
