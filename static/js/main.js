// RailGuard AI - Complete Multilingual Dictionary & Client Controller
// Supports 100% Interface Localization: English (en), Hindi (hi), Marathi (mr)

const translations = {
    en: {
        logoSub: "Platform Risk & Guidance",
        heroTitle: "Smart Platform Verification & Risk Assistance",
        heroSubtitle: "Verify your platform, estimate transit risk, and receive walking guidance to catch your train on time.",
        quickTitle: "⚡ Quick Test Scenarios:",
        chipMatch: "🟢 Correct Platform (12951 @ PF 3)",
        chipMismatch: "🔴 Wrong Platform (12951 @ PF 8)",
        chipTransfer: "🟠 High Transfer (Vande Bharat PF 16 vs 1)",
        formTitle: "Check Train & Platform Status",
        lblTrain: "Train Number or Name:",
        phTrain: "e.g. 12951 or Rajdhani Express",
        helpTrain: "Select from suggestions or enter train number / name",
        lblStation: "Station Name or Code:",
        phStation: "e.g. New Delhi or NDLS",
        lblPlatform: "Your Current Platform:",
        phPlatform: "e.g. 3",
        btnText: "Verify Platform & Analyze Risk",
        btnSpinner: "⏳ Checking...",
        lblAssignedPlat: "Assigned Platform",
        lblYourPlat: "Your Current Platform",
        lblTimeRem: "Time Until Departure",
        lblRiskLevel: "Miss Risk Level",
        analysisTitle: "Risk & Transit Analysis",
        guidanceTitle: "Step-by-Step Walking Guidance",
        disclaimerText: "ℹ️ Academic Prototype Note: Platform information is based on scheduled database records. Always cross-check with official station audio announcements and display boards.",
        footerText: "© 2026 RailGuard AI | B.Tech CSE Final Year AI/ML Capstone Project",
        
        // Alert Banners
        correctPlatform: "✅ Correct Platform: You are on the right platform (Platform {p}).",
        wrongPlatform: "⚠️ WRONG PLATFORM! Train {train} is scheduled at Platform {assigned}, but you are currently on Platform {current}!",
        
        // Badges
        riskLow: "LOW RISK",
        riskMedium: "MEDIUM RISK",
        riskHigh: "HIGH RISK",
        
        // Analysis Labels
        lblDepartureBuffer: "Departure Buffer:",
        lblEstWalkTime: "Estimated Walking Time:",
        lblWalkPath: "Platform {from} to Platform {to}",
        lblCrowdLevel: "Reported Station Crowd:",
        lblEvalModel: "Evaluation Model:",
        minutesWord: "minutes",
        minAbbr: "min",
        
        // Crowd levels
        crowdLow: "Low",
        crowdMedium: "Medium",
        crowdHigh: "High",

        // Errors
        notFound: "Train or station not found in database. Try using the quick test chips above.",
        errorHint: "Try clicking one of the quick test chips above to see a verified sample train.",
        serverError: "Unable to connect to RailGuard service. Please ensure python app.py is running."
    },
    hi: {
        logoSub: "प्लेटफॉर्म जोखिम एवं मार्गदर्शन प्रणाली",
        heroTitle: "स्मार्ट प्लेटफॉर्म सत्यापन एवं जोखिम सहायता",
        heroSubtitle: "अपने प्लेटफॉर्म की पुष्टि करें, ट्रेन छूटने के जोखिम का आकलन करें और समय पर ट्रेन पकड़ने के लिए पैदल मार्गदर्शन प्राप्त करें।",
        quickTitle: "⚡ त्वरित परीक्षण विकल्प:",
        chipMatch: "🟢 सही प्लेटफॉर्म (12951 @ PF 3)",
        chipMismatch: "🔴 गलत प्लेटफॉर्म (12951 @ PF 8)",
        chipTransfer: "🟠 अधिक अंतर (वंदे भारत PF 16 vs 1)",
        formTitle: "ट्रेन एवं प्लेटफॉर्म स्थिति जांचें",
        lblTrain: "ट्रेन नंबर या नाम:",
        phTrain: "उदा. 12951 या राजधानी एक्सप्रेस",
        helpTrain: "सुझावों में से चुनें या 5 अंकों का ट्रेन नंबर दर्ज करें",
        lblStation: "स्टेशन का नाम या कोड:",
        phStation: "उदा. New Delhi या NDLS",
        lblPlatform: "आपका वर्तमान प्लेटफॉर्म:",
        phPlatform: "उदा. 3",
        btnText: "प्लेटफॉर्म जांचें एवं जोखिम विश्लेषण करें",
        btnSpinner: "⏳ जांच जारी है...",
        lblAssignedPlat: "निर्धारित प्लेटफॉर्म",
        lblYourPlat: "आपका वर्तमान प्लेटफॉर्म",
        lblTimeRem: "प्रस्थान में शेष समय",
        lblRiskLevel: "ट्रेन छूटने का जोखिम",
        analysisTitle: "जोखिम एवं पारगमन विश्लेषण",
        guidanceTitle: "कदम-दर-कदम पैदल मार्गदर्शन",
        disclaimerText: "ℹ️ शैक्षणिक प्रोटोटाइप सूचना: प्लेटफॉर्म की जानकारी डेटाबेस रिकॉर्ड पर आधारित है। कृपया स्टेशन उद्घोषणा और डिस्प्ले बोर्ड से भी पुष्टि करें।",
        footerText: "© 2026 RailGuard AI | बी.टेक सीएसई अंतिम वर्ष एआई/एमएल प्रोजेक्ट",
        
        // Alert Banners
        correctPlatform: "✅ सही प्लेटफॉर्म: आप सही प्लेटफॉर्म (प्लेटफॉर्म {p}) पर उपस्थित हैं।",
        wrongPlatform: "⚠️ गलत प्लेटफॉर्म! ट्रेन {train} प्लेटफॉर्म {assigned} पर निर्धारित है, लेकिन आप वर्तमान में प्लेटफॉर्म {current} पर हैं!",
        
        // Badges
        riskLow: "कम जोखिम",
        riskMedium: "मध्यम जोखिम",
        riskHigh: "उच्च जोखिम",
        
        // Analysis Labels
        lblDepartureBuffer: "प्रस्थान बफर:",
        lblEstWalkTime: "अनुमानित पैदल समय:",
        lblWalkPath: "प्लेटफॉर्म {from} से प्लेटफॉर्म {to}",
        lblCrowdLevel: "स्टेशन भीड़ स्तर:",
        lblEvalModel: "विश्लेषण मॉडल:",
        minutesWord: "मिनट",
        minAbbr: "मिनट",
        
        // Crowd levels
        crowdLow: "कम",
        crowdMedium: "मध्यम",
        crowdHigh: "अधिक",

        // Errors
        notFound: "डेटाबेस में यह ट्रेन या स्टेशन नहीं मिला। कृपया ऊपर दिए गए त्वरित परीक्षण विकल्पों का उपयोग करें।",
        errorHint: "सत्यापित ट्रेन देखने के लिए ऊपर दिए गए किसी एक त्वरित विकल्प पर क्लिक करें।",
        serverError: "RailGuard सर्वर से संपर्क नहीं हो सका। कृपया जांचें कि python app.py चालू है।"
    },
    mr: {
        logoSub: "प्लॅटफॉर्म धोका व मार्गदर्शन प्रणाली",
        heroTitle: "स्मार्ट प्लॅटफॉर्म पडताळणी आणि धोका सहाय्य",
        heroSubtitle: "आपल्या प्लॅटफॉर्मची खात्री करा, गाडी सुटण्याच्या धोक्याचे मूल्यांकन करा आणि वेळेवर गाडी पकडण्यासाठी पायी चालण्याचे मार्गदर्शन मिळवा.",
        quickTitle: "⚡ जलद चाचणी पर्याय:",
        chipMatch: "🟢 योग्य प्लॅटफॉर्म (12951 @ PF 3)",
        chipMismatch: "🔴 चुकीचा प्लॅटफॉर्म (12951 @ PF 8)",
        chipTransfer: "🟠 लांब अंतर (वंदे भारत PF 16 vs 1)",
        formTitle: "गाडी आणि प्लॅटफॉर्म स्थिती तपासा",
        lblTrain: "गाडी क्रमांक किंवा नाव:",
        phTrain: "उदा. 12951 किंवा राजधानी एक्सप्रेस",
        helpTrain: "पर्यायांमधून निवडा किंवा गाडी क्रमांक प्रविष्ट करा",
        lblStation: "स्थानकाचे नाव किंवा कोड:",
        phStation: "उदा. Mumbai Central किंवा MMCT",
        lblPlatform: "तुमचा सध्याचा प्लॅटफॉर्म:",
        phPlatform: "उदा. 3",
        btnText: "प्लॅटफॉर्म तपासा आणि धोक्याचे विश्लेषण करा",
        btnSpinner: "⏳ तपासत आहे...",
        lblAssignedPlat: "नियुक्त प्लॅटफॉर्म",
        lblYourPlat: "तुमचा सध्याचा प्लॅटफॉर्म",
        lblTimeRem: "सुटण्यासाठी शिल्लक वेळ",
        lblRiskLevel: "गाडी चुकण्याचा धोका",
        analysisTitle: "धोका आणि संक्रमण विश्लेषण",
        guidanceTitle: "टप्प्याटप्प्याने चालण्याचे मार्गदर्शन",
        disclaimerText: "ℹ️ शैक्षणिक प्रकल्प सूचना: प्लॅटफॉर्मची माहिती डेटाबेस नोंदींवर आधारित आहे. कृपया अधिकृत स्थानक घोषणा आणि डिस्प्ले बोर्ड तपासा.",
        footerText: "© 2026 RailGuard AI | बी.टेक संगणक विज्ञान अंतिम वर्ष एआय/एमएल प्रकल्प",
        
        // Alert Banners
        correctPlatform: "✅ योग्य प्लॅटफॉर्म: तुम्ही योग्य प्लॅटफॉर्मवर (प्लॅटफॉर्म {p}) उपस्थित आहात.",
        wrongPlatform: "⚠️ चुकीचा प्लॅटफॉर्म! गाडी {train} प्लॅटफॉर्म {assigned} वर येणार आहे, परंतु तुम्ही सध्या प्लॅटफॉर्म {current} वर आहात!",
        
        // Badges
        riskLow: "कमी धोका",
        riskMedium: "मध्यम धोका",
        riskHigh: "जास्त धोका",
        
        // Analysis Labels
        lblDepartureBuffer: "सुटण्याचा वेळ बफर:",
        lblEstWalkTime: "अंदाजे चालण्याची वेळ:",
        lblWalkPath: "प्लॅटफॉर्म {from} ते प्लॅटफॉर्म {to}",
        lblCrowdLevel: "स्थानकावरील गर्दीची पातळी:",
        lblEvalModel: "मूल्यमापन मॉडेल:",
        minutesWord: "मिनिटे",
        minAbbr: "मि.",
        
        // Crowd levels
        crowdLow: "कमी",
        crowdMedium: "मध्यम",
        crowdHigh: "जास्त",

        // Errors
        notFound: "डेटाबेसमध्ये ही गाडी किंवा स्थानक आढळले नाही. कृपया वरील चाचणी पर्यायांचा वापर करा.",
        errorHint: "नोंदणीकृत गाडी पाहण्यासाठी वरील चाचणी पर्यायावर क्लिक करा.",
        serverError: "RailGuard सर्व्हरशी संपर्क होऊ शकला नाही. कृपया तपासा की python app.py चालू आहे."
    }
};

let currentLang = 'en';
let lastResultData = null;

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
const errorHint = document.getElementById('errorHint');

const mismatchBanner = document.getElementById('mismatchBanner');
const valAssignedPlat = document.getElementById('valAssignedPlat');
const valYourPlat = document.getElementById('valYourPlat');
const valTimeRem = document.getElementById('valTimeRem');
const valRiskBadge = document.getElementById('valRiskBadge');
const analysisSummary = document.getElementById('analysisSummary');
const factorsList = document.getElementById('factorsList');
const guidanceContent = document.getElementById('guidanceContent');

// 1-Click Quick Test Autofill
window.fillQuickTest = function(train, station, platform) {
    trainInput.value = train;
    stationInput.value = station;
    platformInput.value = platform;
    checkForm.dispatchEvent(new Event('submit'));
};

// Language Selection Change Handler
langSelect.addEventListener('change', (e) => {
    currentLang = e.target.value;
    applyLanguage(currentLang);
    // If results are already showing, immediately re-render them in the new language!
    if (lastResultData && resultCard.style.display !== 'none') {
        renderResults(lastResultData);
    }
});

function applyLanguage(lang) {
    const dict = translations[lang] || translations.en;
    
    // Header & Hero
    document.getElementById('logoSub').innerText = dict.logoSub;
    document.getElementById('heroTitle').innerText = dict.heroTitle;
    document.getElementById('heroSubtitle').innerText = dict.heroSubtitle;
    
    // Quick Test Chips
    document.getElementById('quickTitle').innerText = dict.quickTitle;
    document.getElementById('chipMatch').innerText = dict.chipMatch;
    document.getElementById('chipMismatch').innerText = dict.chipMismatch;
    document.getElementById('chipTransfer').innerText = dict.chipTransfer;
    
    // Form
    document.getElementById('formTitle').innerText = dict.formTitle;
    document.getElementById('lblTrain').innerText = dict.lblTrain;
    trainInput.placeholder = dict.phTrain;
    document.getElementById('helpTrain').innerText = dict.helpTrain;
    document.getElementById('lblStation').innerText = dict.lblStation;
    stationInput.placeholder = dict.phStation;
    document.getElementById('lblPlatform').innerText = dict.lblPlatform;
    platformInput.placeholder = dict.phPlatform;
    document.getElementById('btnText').innerText = dict.btnText;
    document.getElementById('btnSpinner').innerText = dict.btnSpinner;
    
    // Result Card Titles & Labels
    document.getElementById('lblAssignedPlat').innerText = dict.lblAssignedPlat;
    document.getElementById('lblYourPlat').innerText = dict.lblYourPlat;
    document.getElementById('lblTimeRem').innerText = dict.lblTimeRem;
    document.getElementById('lblRiskLevel').innerText = dict.lblRiskLevel;
    document.getElementById('analysisTitle').innerText = dict.analysisTitle;
    document.getElementById('guidanceTitle').innerText = dict.guidanceTitle;
    document.getElementById('disclaimerText').innerText = dict.disclaimerText;
    
    // Footer
    document.getElementById('footerText').innerText = dict.footerText;
    
    // Error card defaults
    if (errorCard.style.display !== 'none') {
        errorMessage.innerText = dict.notFound;
        errorHint.innerText = dict.errorHint;
    }
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

    // Loading State
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
            const dict = translations[currentLang] || translations.en;
            errorMessage.innerText = data.error || dict.notFound;
            errorHint.innerText = dict.errorHint;
            errorCard.style.display = 'flex';
            errorCard.scrollIntoView({ behavior: 'smooth' });
            return;
        }

        lastResultData = data;
        renderResults(data);
    } catch (err) {
        console.error('Fetch error:', err);
        const dict = translations[currentLang] || translations.en;
        errorMessage.innerText = dict.serverError;
        errorHint.innerText = '';
        errorCard.style.display = 'flex';
        errorCard.scrollIntoView({ behavior: 'smooth' });
    } finally {
        btnText.style.display = 'inline';
        btnSpinner.style.display = 'none';
        btnSubmit.disabled = false;
    }
});

// Render Results with 100% Localization
function renderResults(data) {
    const dict = translations[currentLang] || translations.en;

    valAssignedPlat.innerText = data.assigned_platform;
    valYourPlat.innerText = data.current_platform;
    valTimeRem.innerText = `${data.minutes_remaining} ${dict.minAbbr} (${data.departure_time})`;

    // Platform Mismatch Banner
    if (data.is_match) {
        mismatchBanner.className = 'alert-banner alert-success';
        mismatchBanner.innerText = dict.correctPlatform.replace('{p}', data.assigned_platform);
    } else {
        mismatchBanner.className = 'alert-banner alert-danger';
        mismatchBanner.innerText = dict.wrongPlatform
            .replace('{train}', `${data.train_number} (${data.train_name})`)
            .replace('{assigned}', data.assigned_platform)
            .replace('{current}', data.current_platform);
    }

    // Localized Risk Badge
    valRiskBadge.className = `badge badge-${data.risk_level.toLowerCase()}`;
    if (data.risk_level === 'Low') {
        valRiskBadge.innerText = dict.riskLow;
    } else if (data.risk_level === 'Medium') {
        valRiskBadge.innerText = dict.riskMedium;
    } else {
        valRiskBadge.innerText = dict.riskHigh;
    }

    // Localized Crowd Level text
    let localizedCrowd = data.crowd_level;
    if (data.crowd_level.toLowerCase() === 'low') localizedCrowd = dict.crowdLow;
    else if (data.crowd_level.toLowerCase() === 'medium') localizedCrowd = dict.crowdMedium;
    else if (data.crowd_level.toLowerCase() === 'high') localizedCrowd = dict.crowdHigh;

    // Localized Path string
    const walkPathDesc = dict.lblWalkPath
        .replace('{from}', data.current_platform)
        .replace('{to}', data.assigned_platform);

    // Analysis summary from backend (or fallback)
    analysisSummary.innerText = data.risk_summary;

    // Localized Factor list
    factorsList.innerHTML = `
        <li><strong>${dict.lblDepartureBuffer}</strong> ${data.minutes_remaining} ${dict.minutesWord}</li>
        <li><strong>${dict.lblEstWalkTime}</strong> ~${data.estimated_walk_minutes} ${dict.minutesWord} (${walkPathDesc})</li>
        <li><strong>${dict.lblCrowdLevel}</strong> ${localizedCrowd}</li>
        <li><strong>${dict.lblEvalModel}</strong> ${data.model_used}</li>
    `;

    // Localized Step-by-Step Guidance
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
