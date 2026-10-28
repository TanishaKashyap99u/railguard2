"""
RailGuard AI - ML Training Dataset Generator
Creates 1,000 realistic passenger transit risk scenarios across Indian Railway platforms.
"""

import os
import csv
import random

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATA_DIR = os.path.join(BASE_DIR, 'data')
OUTPUT_CSV = os.path.join(DATA_DIR, 'risk_training_dataset.csv')

os.makedirs(DATA_DIR, exist_ok=True)

# Set random seed for reproducibility
random.seed(42)

def generate_dataset(num_samples=1000):
    headers = [
        'minutes_remaining',
        'platform_gap',
        'base_walk_minutes',
        'crowd_level',
        'crowd_encoded',
        'estimated_walk_minutes',
        'time_buffer_margin',
        'risk_label'
    ]

    crowd_options = [
        ('Low', 0, -1),
        ('Medium', 1, 0),
        ('High', 2, 3)
    ]

    records = []

    for _ in range(num_samples):
        # 1. Available time before departure: 2 to 90 minutes
        minutes_remaining = random.randint(2, 90)

        # 2. Platform gap: 0 (already on platform) to 15 (e.g. PF 1 to PF 16)
        # 30% chance of being on the correct platform (platform_gap = 0)
        if random.random() < 0.30:
            platform_gap = 0
        else:
            platform_gap = random.randint(1, 15)

        # 3. Base walking minutes (station size dependent)
        base_walk = random.choice([3, 4, 5, 6, 7])

        # 4. Crowd level
        crowd_level, crowd_encoded, crowd_delay = random.choice(crowd_options)

        # 5. Estimated walking transit time calculation
        if platform_gap == 0:
            estimated_walk = 0
        else:
            estimated_walk = base_walk + int(platform_gap * 1.5) + crowd_delay
            estimated_walk = max(2, estimated_walk)

        # 6. Safety buffer margin = time remaining - walking time
        time_buffer = minutes_remaining - estimated_walk

        # 7. Ground Truth Label Assignment based on transit physics & crowd impedance
        if platform_gap == 0:
            # Already on correct platform
            if minutes_remaining <= 2:
                risk_label = 'Medium'  # Train closing doors
            else:
                risk_label = 'Low'
        else:
            # Passenger is on WRONG platform
            if time_buffer < 5:
                # Under 5 mins margin -> imminent risk of missing train
                risk_label = 'High'
            elif 5 <= time_buffer <= 14:
                # 5 to 14 mins margin -> tight transit buffer
                risk_label = 'Medium'
            else:
                # 15+ mins margin -> comfortable transfer window
                risk_label = 'Low'

        records.append([
            minutes_remaining,
            platform_gap,
            base_walk,
            crowd_level,
            crowd_encoded,
            estimated_walk,
            time_buffer,
            risk_label
        ])

    with open(OUTPUT_CSV, 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        writer.writerow(headers)
        writer.writerows(records)

    print(f"[OK] Generated {num_samples} realistic training records in {OUTPUT_CSV}")

if __name__ == '__main__':
    generate_dataset()
