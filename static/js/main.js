// RailGuard AI - Client-side Interaction & Localization

// Multilingual Dictionary (English & Hindi)
const translations = {
    en: {
        heroTitle: "Smart Platform Verification & Risk Assistance",
        heroSubtitle: "Verify your platform, estimate transit risk, and receive walking guidance to catch your train on time.",
        formTitle: "Check Train & Platform Status",
        lblTrain: "Train Number or Name:",
        helpTrain: "Select from suggestions or enter train number / name",
        lblStation: "Station Name or Code:",
        lblPlatform: "Your Current Platform:",
        btnText: "Verify Platform & Analyze Risk",
        lblAssignedPlat: "Assigned Platform",
        lblYourPlat: "Your Current Platform",
        lblTimeRem: "Time Until Departure",
        lblRiskLevel: "Miss Risk Level",
        analysisTitle: "Risk & Transit Analysis",
        guidanceTitle: "Step-by-Step Walking Guidance",
        disclaimerText: "ℹ️ Academic Prototype Note: Platform information is based on scheduled database records. Always cross-check with official station audio announcements and display boards.",
        correctPlatform: "✅ Correct Platform: You are on the right platform (Platform {p}).",
        wrongPlatform: "⚠️ WRONG PLATFORM! Train {train} is scheduled at Platform {assigned}, but you are currently on Platform {current}!",
        matchGuidance: "You are already on the correct platform. Please wait near the coach indicator board and listen to overhead railway announcements.",
        riskLow: "LOW",
        riskMedium: "MEDIUM",
        riskHigh: "HIGH",
        notFound: "Train or station not found in database. Try using the quick test chips above.",
        serverError: "Unable to connect to RailGuard service. Please ensure python app.py is running."
    },
    hi: {
        heroTitle: "स्मार्ट प्लेटफॉर्म सत्यापन एवं जोखिम सहायता",
        heroSubtitle: "अपने प्लेटफॉर्म की पुष्टि करें, ट्रेन छूटने के जोखिम का आकलन करें और समय पर ट्रेन पकड़ने के लिए पैदल मार्गदर्शन प्राप्त करें।",
        formTitle: "ट्रेन एवं प्लेटफॉर्म स्थिति जांचें",
        lblTrain: "ट्रेन नंबर या नाम:",
        helpTrain: "सुझावों में से चुनें या 5 अंकों का ट्रेन नंबर दर्ज करें",
        lblStation: "स्टेशन का नाम या कोड:",
        lblPlatform: "आपका वर्तमान प्लेटफॉर्म:",
        btnText: "प्लेटफॉर्म जांचें एवं जोखिम का विश्लेषण करें",
        lblAssignedPlat: "निर्धारित प्लेटफॉर्म",
        lblYourPlat: "आपका वर्तमान प्लेटफॉर्म",
        lblTimeRem: "प्रस्थान में शेष समय",
        lblRiskLevel: "ट्रेन छूटने का जोखिम",
        analysisTitle: "जोखिम एवं पारगमन विश्लेषण",
        guidanceTitle: "कदम-दर-कदम पैदल मार्गदर्शन",
        disclaimerText: "ℹ️ शैक्षणिक प्रोटोटाइप सूचना: प्लेटफॉर्म की जानकारी डेटाबेस रिकॉर्ड पर आधारित है। कृपया स्टेशन उद्घोषणा और डिस्प्ले बोर्ड से भी पुष्टि करें।",
        correctPlatform: "✅ सही प्लेटफॉर्म: आप सही प्लेटफॉर्म (प्लेटफॉर्म {p}) पर उपस्थित हैं।",
        wrongPlatform: "⚠️ गलत प्लेटफॉर्म! ट्रेन {train} प्लेटफॉर्म {assigned} पर आएगी, लेकिन आप प्लेटफॉर्म {current} पर हैं!",
        matchGuidance: "आप पहले से ही सही प्लेटफॉर्म पर हैं। कृपया कोच इंडिकेटर बोर्ड के पास प्रतीक्षा करें और उद्घोषणा ध्यान से सुनें।",
        riskLow: "कम",
        riskMedium: "मध्यम",
        riskHigh: "उच्च",
        notFound: "डेटाबेस में यह ट्रेन या स्टेशन नहीं मिला। कृपया ऊपर दिए गए त्वरित परीक्षण विकल्पों का उपयोग करें।",
        serverError: "RailGuard सर्वर से संपर्क नहीं हो सका। कृपया जांचें कि python app.py चालू है।"
    }
};

let currentLang = 'en';

// DOM Elements
const langSelect = document.getElementById('langSelect');
const checkForm = document.getElementById('checkForm');
const trainInput = document.getElementById('trainInput');
const stationInput = document.getElementById('stationInput');
const platformInput = document.getElementById('platformInput');
const btnSubmit = document.getElementById('btnSubmit');
const btnText = document.getElementById('btnText');
const btnSpinner = document.getElementById('btnSpinner');

const resultCard = document.getElementById('resultCard');
const errorCard = document.getElementById('errorCard');
const errorMessage = document.getElementById('errorMessage');

const mismatchBanner = document.getElementById('mismatchBanner');
const valAssignedPlat = document.getElementById('valAssignedPlat');
const valYourPlat = document.getElementById('valYourPlat');
const valTimeRem = document.getElementById('valTimeRem');
const valRiskBadge = document.getElementById('valRiskBadge');
const analysisSummary = document.getElementById('analysisSummary');
const factorsList = document.getElementById('factorsList');
const guidanceContent = document.getElementById('guidanceContent');

// Quick Test Chip Autofill function
window.fillQuickTest = function(train, station, platform) {
    trainInput.value = train;
    stationInput.value = station;
    platformInput.value = platform;
    checkForm.dispatchEvent(new Event('submit'));
};

// Language Change Handler
langSelect.addEventListener('change', (e) => {
    currentLang = e.target.value;
    applyLanguage(currentLang);
});

function applyLanguage(lang) {
    const dict = translations[lang] || translations.en;
    document.getElementById('heroTitle').innerText = dict.heroTitle;
    document.getElementById('heroSubtitle').innerText = dict.heroSubtitle;
    document.getElementById('formTitle').innerText = dict.formTitle;
    document.getElementById('lblTrain').innerText = dict.lblTrain;
    document.getElementById('helpTrain').innerText = dict.helpTrain;
    document.getElementById('lblStation').innerText = dict.lblStation;
    document.getElementById('lblPlatform').innerText = dict.lblPlatform;
    document.getElementById('btnText').innerText = dict.btnText;
    document.getElementById('lblAssignedPlat').innerText = dict.lblAssignedPlat;
    document.getElementById('lblYourPlat').innerText = dict.lblYourPlat;
    document.getElementById('lblTimeRem').innerText = dict.lblTimeRem;
    document.getElementById('lblRiskLevel').innerText = dict.lblRiskLevel;
    document.getElementById('analysisTitle').innerText = dict.analysisTitle;
    document.getElementById('guidanceTitle').innerText = dict.guidanceTitle;
    document.getElementById('disclaimerText').innerText = dict.disclaimerText;
}

// Form Submission & API Call
checkForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const train = trainInput.value.trim();
    const station = stationInput.value.trim();
    const currentPlatform = parseInt(platformInput.value.trim(), 10);

    if (!train || isNaN(currentPlatform)) {
        return;
    }

    // UI Loading state
    btnText.style.display = 'none';
    btnSpinner.style.display = 'inline';
    btnSubmit.disabled = true;
    resultCard.style.display = 'none';
    errorCard.style.display = 'none';

    try {
        const response = await fetch('/api/check-platform', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                train: train,
                station: station,
                current_platform: currentPlatform,
                language: currentLang
            })
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
            errorMessage.innerText = data.error || (translations[currentLang] || translations.en).notFound;
            errorCard.style.display = 'flex';
            errorCard.scrollIntoView({ behavior: 'smooth' });
            return;
        }

        renderResults(data);
    } catch (err) {
        console.error('Fetch error:', err);
        errorMessage.innerText = (translations[currentLang] || translations.en).serverError;
        errorCard.style.display = 'flex';
        errorCard.scrollIntoView({ behavior: 'smooth' });
    } finally {
        btnText.style.display = 'inline';
        btnSpinner.style.display = 'none';
        btnSubmit.disabled = false;
    }
});

// Render Verification & Risk Results
function renderResults(data) {
    const dict = translations[currentLang] || translations.en;

    valAssignedPlat.innerText = data.assigned_platform;
    valYourPlat.innerText = data.current_platform;
    valTimeRem.innerText = data.minutes_remaining + ' min (' + data.departure_time + ')';

    // Platform Mismatch Banner
    if (data.is_match) {
        mismatchBanner.className = 'alert-banner alert-success';
        mismatchBanner.innerText = dict.correctPlatform.replace('{p}', data.assigned_platform);
    } else {
        mismatchBanner.className = 'alert-banner alert-danger';
        mismatchBanner.innerText = dict.wrongPlatform
            .replace('{train}', data.train_number + ' (' + data.train_name + ')')
            .replace('{assigned}', data.assigned_platform)
            .replace('{current}', data.current_platform);
    }

    // Risk Badge
    valRiskBadge.className = 'badge badge-' + data.risk_level.toLowerCase();
    if (data.risk_level === 'Low') {
        valRiskBadge.innerText = dict.riskLow;
    } else if (data.risk_level === 'Medium') {
        valRiskBadge.innerText = dict.riskMedium;
    } else {
        valRiskBadge.innerText = dict.riskHigh;
    }

    // Risk Analysis details
    analysisSummary.innerText = data.risk_summary;
    factorsList.innerHTML = `
        <li><strong>Departure Buffer:</strong> ${data.minutes_remaining} minutes remaining</li>
        <li><strong>Estimated Walking Time:</strong> ~${data.estimated_walk_minutes} minutes (Platform ${data.current_platform} to ${data.assigned_platform})</li>
        <li><strong>Reported Station Crowd:</strong> ${data.crowd_level}</li>
        <li><strong>Evaluation Model:</strong> ${data.model_used}</li>
    `;

    // Guidance Steps
    guidanceContent.innerHTML = '';
    if (data.guidance && data.guidance.length > 0) {
        data.guidance.forEach((step, idx) => {
            const stepEl = document.createElement('div');
            stepEl.className = 'guidance-step';
            stepEl.innerHTML = `
                <div class="step-num">${idx + 1}</div>
                <div class="step-desc">${step}</div>
            `;
            guidanceContent.appendChild(stepEl);
        });
    }

    resultCard.style.display = 'block';
    resultCard.scrollIntoView({ behavior: 'smooth' });
}
