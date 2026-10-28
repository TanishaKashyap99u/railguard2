"""
RailGuard AI - Machine Learning Model Training & Evaluation
Module: Scikit-learn Classifier for Railway Transit Risk Prediction
"""

import os
import json
import csv

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
DATA_PATH = os.path.join(BASE_DIR, 'data', 'risk_training_dataset.csv')
MODELS_DIR = os.path.join(BASE_DIR, 'models')
MODEL_FILE = os.path.join(MODELS_DIR, 'risk_model.joblib')
METRICS_FILE = os.path.join(MODELS_DIR, 'model_metrics.json')

os.makedirs(MODELS_DIR, exist_ok=True)

def train():
    print("=" * 65)
    print("      RAILGUARD AI - MACHINE LEARNING TRAINING PIPELINE")
    print("=" * 65)

    if not os.path.exists(DATA_PATH):
        print(f"[ERROR] Training dataset not found at {DATA_PATH}")
        print("Please run: python generate_ml_dataset.py first.")
        return

    try:
        import pandas as pd
        import numpy as np
        from sklearn.model_selection import train_test_split
        from sklearn.ensemble import RandomForestClassifier
        from sklearn.tree import DecisionTreeClassifier
        from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
        import joblib

        print(f"\n[1/5] Loading training dataset from {DATA_PATH} ...")
        df = pd.read_csv(DATA_PATH)
        print(f"      Total records loaded: {len(df)}")
        print(f"      Class distribution:\n{df['risk_label'].value_counts().to_string()}\n")

        # Define Features (X) and Target (y)
        feature_cols = ['minutes_remaining', 'platform_gap', 'base_walk_minutes', 'crowd_encoded']
        X = df[feature_cols]
        y = df['risk_label']

        # 80% Train, 20% Test Split with Stratification
        print("[2/5] Splitting data into 80% Training and 20% Testing sets...")
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.20, random_state=42, stratify=y
        )
        print(f"      Training instances: {len(X_train)} | Testing instances: {len(X_test)}")

        # Train Baseline Decision Tree
        print("\n[3/5] Training Baseline Decision Tree Classifier...")
        dt_model = DecisionTreeClassifier(max_depth=5, random_state=42)
        dt_model.fit(X_train, y_train)
        dt_pred = dt_model.predict(X_test)
        dt_acc = accuracy_score(y_test, dt_pred)
        print(f"      Decision Tree Test Accuracy: {dt_acc * 100:.2f}%")

        # Train Production Random Forest Classifier
        print("\n[4/5] Training Production Random Forest Ensemble (100 Trees)...")
        rf_model = RandomForestClassifier(n_estimators=100, max_depth=8, random_state=42)
        rf_model.fit(X_train, y_train)
        rf_pred = rf_model.predict(X_test)
        rf_acc = accuracy_score(y_test, rf_pred)
        print(f"      Random Forest Test Accuracy: {rf_acc * 100:.2f}%")

        # Detailed Evaluation Metrics
        print("\n" + "=" * 65)
        print("                 CLASSIFICATION EVALUATION REPORT")
        print("=" * 65)
        class_report_str = classification_report(y_test, rf_pred)
        print(class_report_str)

        cm = confusion_matrix(y_test, rf_pred, labels=['Low', 'Medium', 'High'])
        print("Confusion Matrix [Rows: Actual, Cols: Predicted (Low, Medium, High)]:")
        print(cm)

        # Feature Importance Analysis
        importances = rf_model.feature_importances_
        feature_importance_dict = dict(zip(feature_cols, [round(float(imp), 4) for imp in importances]))
        print("\nFeature Importances (Impact on Transit Risk):")
        for feat, imp in sorted(feature_importance_dict.items(), key=lambda x: x[1], reverse=True):
            print(f"  - {feat:20s}: {imp * 100:.2f}%")

        # Save Model to disk
        print(f"\n[5/5] Exporting trained Random Forest model to {MODEL_FILE} ...")
        joblib.dump(rf_model, MODEL_FILE)

        # Save metrics for Admin dashboard visualization
        metrics_data = {
            'model_name': 'Random Forest Classifier',
            'n_estimators': 100,
            'test_accuracy': round(float(rf_acc) * 100, 2),
            'baseline_dt_accuracy': round(float(dt_acc) * 100, 2),
            'total_samples': len(df),
            'train_samples': len(X_train),
            'test_samples': len(X_test),
            'feature_importances': feature_importance_dict,
            'confusion_matrix': cm.tolist(),
            'classes': ['Low', 'Medium', 'High']
        }

        with open(METRICS_FILE, 'w', encoding='utf-8') as f:
            json.dump(metrics_data, f, indent=4)

        print(f"[OK] Model and metrics exported successfully!")
        print("=" * 65)

    except ImportError:
        print("\n[NOTICE] 'scikit-learn' or 'joblib' is not installed in this environment.")
        print("To train the production model, please run:")
        print("    pip install scikit-learn joblib")
        print("In the meantime, RailGuard AI will use its transparent Rule-Based Risk Engine.")

if __name__ == '__main__':
    train()
