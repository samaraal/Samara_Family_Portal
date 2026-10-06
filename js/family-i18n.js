/* Samara Family Portal — English / தமிழ் language switch (v1.0.20)
   A display-only layer: it changes the words on screen, never the data sent to the ERP.
   Residents' names, medicine names, IDs, numbers and dates are left exactly as recorded. */
(function(){
  'use strict';
  var STORE='samara_family_portal_language';
  var DICT={
"View-only family report generated from the resident's Family Portal-visible ERP records.": "குடியிருப்பாளரின் குடும்ப போர்டலில் காணக்கூடிய ERP பதிவுகளிலிருந்து உருவான, பார்வைக்கு மட்டுமான குடும்ப அறிக்கை.",
"Invitation to the inauguration of Samara Assisted Living on 27 August 2026, Mogappair, Chennai": "27 ஆகஸ்ட் 2026 அன்று சென்னை முகப்பேரில் நடைபெறும் சமரா அசிஸ்டெட் லிவிங் திறப்பு விழா அழைப்பிதழ்",
"Samara inauguration invitation could not be displayed.": "சமரா திறப்பு விழா அழைப்பிதழைக் காட்ட முடியவில்லை.",
"Samara Family Portal": "சமரா குடும்ப போர்டல்",
"Family Portal": "குடும்ப போர்டல்",
"Samara Assisted Living": "சமரா அசிஸ்டெட் லிவிங்",
"Samara Health Care LLP": "சமரா ஹெல்த் கேர் எல்எல்பி",
"SAMARA HEALTH CARE LLP": "சமரா ஹெல்த் கேர் எல்எல்பி",
"Secure Family Access": "பாதுகாப்பான குடும்ப அணுகல்",
"Stay connected with your loved one.": "உங்கள் அன்புக்குரியவருடன் எப்போதும் இணைந்திருங்கள்.",
"Authorised family members can view approved care updates, medicines, vitals, bills, documents and visit information.": "அங்கீகரிக்கப்பட்ட குடும்ப உறுப்பினர்கள் அனுமதிக்கப்பட்ட பராமரிப்புத் தகவல்கள், மருந்துகள், உடல்நிலைக் குறியீடுகள், கட்டணங்கள், ஆவணங்கள் மற்றும் சந்திப்புத் தகவல்களைப் பார்க்கலாம்.",
"Daily Care Updates": "தினசரி பராமரிப்புத் தகவல்கள்",
"Approved care and wellbeing information": "அனுமதிக்கப்பட்ட பராமரிப்பு மற்றும் நல்வாழ்வுத் தகவல்கள்",
"Clinical Summary": "மருத்துவச் சுருக்கம்",
"Medicines, vitals and doctor coordination": "மருந்துகள், உடல்நிலைக் குறியீடுகள், மருத்துவர் ஒருங்கிணைப்பு",
"Billing Access": "கட்டண விவரங்கள்",
"Bills, receipts and outstanding information": "பில்கள், ரசீதுகள், நிலுவைத் தொகை விவரங்கள்",
"Family Login": "குடும்ப உள்நுழைவு",
"Welcome back": "மீண்டும் வருக",
"Use the resident Patient ID and your secure 6-digit Access PIN.": "குடியிருப்பாளரின் Patient ID மற்றும் உங்கள் 6 இலக்க Access PIN-ஐப் பயன்படுத்தவும்.",
"Patient ID": "நோயாளர் அடையாள எண் (Patient ID)",
"Example: PAT-2026-08-0002": "உதாரணம்: PAT-2026-08-0002",
"Access PIN": "அணுகல் PIN",
"6-digit PIN": "6 இலக்க PIN",
"Show Access PIN": "PIN-ஐக் காட்டு",
"Hide Access PIN": "PIN-ஐ மறை",
"Sign in securely": "பாதுகாப்பாக உள்நுழைக",
"← Return to Samara website": "← சமரா இணையதளத்திற்குத் திரும்பு",
"First Login Security": "முதல் உள்நுழைவுப் பாதுகாப்பு",
"Create your private Access PIN.": "உங்கள் தனிப்பட்ட Access PIN-ஐ உருவாக்குங்கள்.",
"The PIN sent by Samara is temporary. For privacy and security, please replace it with a new 6-digit PIN before entering the Family Portal.": "சமரா அனுப்பிய PIN தற்காலிகமானது. தனியுரிமை மற்றும் பாதுகாப்பிற்காக, குடும்ப போர்டலுக்குள் நுழையும் முன் அதைப் புதிய 6 இலக்க PIN-ஆக மாற்றவும்.",
"One-time change": "ஒருமுறை மட்டும் மாற்றம்",
"Required only after a new or reset temporary PIN": "புதிய அல்லது மீட்டமைக்கப்பட்ட தற்காலிக PIN-க்குப் பிறகு மட்டும் தேவை",
"Private access": "தனிப்பட்ட அணுகல்",
"Do not share your new PIN with anyone": "உங்கள் புதிய PIN-ஐ யாருடனும் பகிர வேண்டாம்",
"Secure Setup": "பாதுகாப்பான அமைப்பு",
"Set a new PIN": "புதிய PIN அமைக்கவும்",
"Please create a new private 6-digit Access PIN.": "புதிய தனிப்பட்ட 6 இலக்க Access PIN-ஐ உருவாக்கவும்.",
"New Access PIN": "புதிய Access PIN",
"New 6-digit PIN": "புதிய 6 இலக்க PIN",
"Show new Access PIN": "புதிய PIN-ஐக் காட்டு",
"Confirm New Access PIN": "புதிய Access PIN-ஐ உறுதிப்படுத்தவும்",
"Re-enter new PIN": "புதிய PIN-ஐ மீண்டும் உள்ளிடவும்",
"Show confirmed Access PIN": "உறுதிப்படுத்திய PIN-ஐக் காட்டு",
"Save New PIN": "புதிய PIN-ஐச் சேமி",
"← Sign out and return to login": "← வெளியேறி உள்நுழைவுக்குத் திரும்பு",
"Overview": "கண்ணோட்டம்",
"Daily Care": "தினசரி பராமரிப்பு",
"Daily Moments": "தினசரித் தருணங்கள்",
"Medicines": "மருந்துகள்",
"Vitals": "உடல்நிலைக் குறியீடுகள்",
"Physiotherapy": "பிசியோதெரபி",
"Billing": "கட்டணங்கள்",
"Documents": "ஆவணங்கள்",
"Intelligent Report": "நுண்ணறிவு அறிக்கை",
"Admission Enquiry": "சேர்க்கை விசாரணை",
"Visit Requests": "சந்திப்புக் கோரிக்கைகள்",
"Messages": "செய்திகள்",
"Feedback": "கருத்துகள்",
"About Us": "எங்களைப் பற்றி",
"Family Member": "குடும்ப உறுப்பினர்",
"Authorised Relative": "அங்கீகரிக்கப்பட்ட உறவினர்",
"Sign out": "வெளியேறு",
"↻ Refresh": "↻ புதுப்பி",
"✓ Updated": "✓ புதுப்பிக்கப்பட்டது",
"Secure Access": "பாதுகாப்பான அணுகல்",
"Secure": "பாதுகாப்பானது",
"Currently at Samara": "தற்போது சமராவில்",
"Resident": "குடியிருப்பாளர்",
"Patient information will load after secure sign-in.": "பாதுகாப்பான உள்நுழைவுக்குப் பின் நோயாளர் தகவல் தோன்றும்.",
"Authorised family access": "அங்கீகரிக்கப்பட்ட குடும்ப அணுகல்",
"Current Condition": "தற்போதைய உடல்நிலை",
"Loading…": "ஏற்றப்படுகிறது…",
"Reading latest ERP information": "சமீபத்திய ERP தகவல் படிக்கப்படுகிறது",
"Medicines Today": "இன்றைய மருந்துகள்",
"Loading live ERP data": "நேரடி ERP தரவு ஏற்றப்படுகிறது",
"Loading live data": "நேரடித் தரவு ஏற்றப்படுகிறது",
"Latest Vitals": "சமீபத்திய உடல்நிலைக் குறியீடுகள்",
"Latest BP": "சமீபத்திய BP",
"Outstanding": "நிலுவைத் தொகை",
"Based on ERP ledger": "ERP கணக்கேட்டின் அடிப்படையில்",
"Payments": "கட்டணம் செலுத்துதல்",
"Secure online payments": "பாதுகாப்பான ஆன்லைன் கட்டணம்",
"Pay the current balance or add an advance without opening Billing.": "கட்டணங்கள் பக்கத்தைத் திறக்காமலே நிலுவையைச் செலுத்தலாம் அல்லது முன்பணம் செலுத்தலாம்.",
"Pay Advance": "முன்பணம் செலுத்து",
"Pay Outstanding": "நிலுவையைச் செலுத்து",
"No Amount Due": "நிலுவை இல்லை",
"Today": "இன்று",
"TODAY": "இன்று",
"Care Timeline": "பராமரிப்புக் காலவரிசை",
"View all": "அனைத்தையும் காண்க",
"Loading current care information…": "தற்போதைய பராமரிப்புத் தகவல் ஏற்றப்படுகிறது…",
"Please wait": "சற்றுக் காத்திருக்கவும்",
"Reading ERP records": "ERP பதிவுகள் படிக்கப்படுகின்றன",
"Communication": "தகவல் தொடர்பு",
"Latest Update": "சமீபத்திய தகவல்",
"Latest ERP Update": "சமீபத்திய ERP தகவல்",
"Loading latest update…": "சமீபத்திய தகவல் ஏற்றப்படுகிறது…",
"No administration recorded today": "இன்று மருந்து வழங்கல் பதிவு இல்லை",
"No active medicine orders": "நடப்பு மருந்து ஆணைகள் இல்லை",
"No vital signs recorded": "உடல்நிலைக் குறியீடுகள் பதிவு இல்லை",
"No care activity recorded today": "இன்று பராமரிப்புச் செயல்பாடு பதிவு இல்லை",
"No care plan or activity recorded": "பராமரிப்புத் திட்டம் அல்லது செயல்பாடு பதிவு இல்லை",
"Last vitals": "கடைசி உடல்நிலைக் குறியீடுகள்",
"No recent vital-sign entry": "சமீபத்திய உடல்நிலைப் பதிவு இல்லை",
"Not recorded": "பதிவு இல்லை",
"Approved care updates": "அனுமதிக்கப்பட்ட பராமரிப்புத் தகவல்கள்",
"Live ERP data": "நேரடி ERP தரவு",
"ERP data": "ERP தரவு",
"Care Activity": "பராமரிப்புச் செயல்பாடு",
"Shift": "ஷிஃப்ட்",
"Status": "நிலை",
"Completed At": "முடிந்த நேரம்",
"Remarks": "குறிப்புகள்",
"Loading live ERP data…": "நேரடி ERP தரவு ஏற்றப்படுகிறது…",
"Daily care": "தினசரி பராமரிப்பு",
"Care": "பராமரிப்பு",
"A little glimpse of your loved one": "உங்கள் அன்புக்குரியவரின் ஒரு சிறு பார்வை",
"Available for 7 days": "7 நாட்கள் மட்டும் கிடைக்கும்",
"Stay close, even from a distance.": "தொலைவில் இருந்தாலும், அருகிலேயே இருங்கள்.",
"Short moments shared by the Samara care team are available here for seven days. These private clips are visible only through authorised Family Portal access.": "சமரா பராமரிப்புக் குழு பகிரும் சிறு தருணங்கள் இங்கு ஏழு நாட்கள் கிடைக்கும். இந்தத் தனிப்பட்ட காணொளிகள் அங்கீகரிக்கப்பட்ட குடும்ப போர்டல் அணுகல் மூலம் மட்டுமே தெரியும்.",
"Loading Daily Moments…": "தினசரித் தருணங்கள் ஏற்றப்படுகின்றன…",
"Please wait while we securely check for recent clips.": "சமீபத்திய காணொளிகளைப் பாதுகாப்பாகச் சரிபார்க்கிறோம், சற்றுக் காத்திருக்கவும்.",
"Daily Moment": "தினசரித் தருணம்",
"A moment shared by Samara": "சமரா பகிர்ந்த ஒரு தருணம்",
"A moment from Samara": "சமராவிலிருந்து ஒரு தருணம்",
"Shared with care by Samara Assisted Living": "சமரா அசிஸ்டெட் லிவிங் அன்புடன் பகிர்ந்தது",
"No Daily Moments have been shared during the last 7 days.": "கடந்த 7 நாட்களில் தினசரித் தருணங்கள் எதுவும் பகிரப்படவில்லை.",
"Opening recent clips securely.": "சமீபத்திய காணொளிகள் பாதுகாப்பாகத் திறக்கப்படுகின்றன.",
"When the care team shares a new short clip, it will appear here automatically.": "பராமரிப்புக் குழு புதிய காணொளியைப் பகிர்ந்தவுடன் அது தானாக இங்கு தோன்றும்.",
"Please sign in to view Daily Moments.": "தினசரித் தருணங்களைப் பார்க்க உள்நுழையவும்.",
"Daily Moments are temporarily unavailable.": "தினசரித் தருணங்கள் தற்காலிகமாகக் கிடைக்கவில்லை.",
"Please refresh after a little while. Your other Family Portal information is unaffected.": "சிறிது நேரம் கழித்துப் புதுப்பிக்கவும். உங்கள் மற்ற குடும்ப போர்டல் தகவல்கள் பாதிக்கப்படவில்லை.",
"Unable to load Daily Moments.": "தினசரித் தருணங்களை ஏற்ற முடியவில்லை.",
"Admin preview uses the same family-visible Daily Moments already loaded in ERP.": "நிர்வாக முன்னோட்டம், ERP-இல் ஏற்கெனவே உள்ள அதே குடும்பத் தருணங்களைக் காட்டுகிறது.",
"Medication": "மருந்து விவரம்",
"Current medicines and administration": "நடப்பு மருந்துகளும் வழங்கலும்",
"Medicine": "மருந்து",
"No.": "வ.எண்",
"Strength": "அளவு",
"Frequency": "எத்தனை முறை",
"Time": "நேரம்",
"Food": "உணவு",
"Only family-approved medication information is displayed here. Contact the Samara nursing team for clarifications or changes.": "குடும்பத்திற்கு அனுமதிக்கப்பட்ட மருந்துத் தகவல்கள் மட்டுமே இங்கு காட்டப்படுகின்றன. விளக்கங்கள் அல்லது மாற்றங்களுக்குச் சமரா செவிலியர் குழுவைத் தொடர்பு கொள்ளவும்.",
"Given": "வழங்கப்பட்டது",
"Pending": "நிலுவையில்",
"Scheduled": "திட்டமிடப்பட்டது",
"Recorded": "பதிவு செய்யப்பட்டது",
"Completed": "முடிந்தது",
"Missed": "தவறியது",
"Held": "நிறுத்தி வைக்கப்பட்டது",
"Refused": "மறுக்கப்பட்டது",
"Skipped": "தவிர்க்கப்பட்டது",
"Approved": "அனுமதிக்கப்பட்டது",
"Confirmed": "உறுதிசெய்யப்பட்டது",
"Rejected": "நிராகரிக்கப்பட்டது",
"Cancelled": "ரத்து செய்யப்பட்டது",
"Active": "நடப்பில்",
"Morning Shift": "காலை ஷிஃப்ட்",
"Evening Shift": "மாலை ஷிஃப்ட்",
"Night Shift": "இரவு ஷிஃப்ட்",
"Day Shift": "பகல் ஷிஃப்ட்",
"Night": "இரவு",
"Before Food": "உணவுக்கு முன்",
"After Food": "உணவுக்குப் பின்",
"With Food": "உணவுடன்",
"Recent recorded observations": "சமீபத்தில் பதிவான அளவீடுகள்",
"Date & Time": "தேதி & நேரம்",
"BP": "BP",
"Pulse": "நாடித் துடிப்பு",
"SpO₂": "SpO₂",
"Temperature": "வெப்பநிலை",
"Temp": "வெப்பநிலை",
"Recorded By": "பதிவு செய்தவர்",
"Blood Pressure": "இரத்த அழுத்தம்",
"Blood Sugar": "இரத்தச் சர்க்கரை",
"Sugar": "சர்க்கரை",
"Samara staff": "சமரா பணியாளர்",
"Vitals recorded": "உடல்நிலைக் குறியீடுகள் பதிவு செய்யப்பட்டன",
"Observation recorded": "அளவீடு பதிவு செய்யப்பட்டது",
"Normal": "இயல்பு",
"Mobility and rehabilitation updates": "நடமாட்டம் மற்றும் மறுவாழ்வுத் தகவல்கள்",
"Current Plan": "நடப்புத் திட்டம்",
"Latest Progress Note": "சமீபத்திய முன்னேற்றக் குறிப்பு",
"Therapy Type": "சிகிச்சை வகை",
"Preferred Time": "விருப்பமான நேரம்",
"Physiotherapist": "பிசியோதெரபிஸ்ட்",
"No active physiotherapy plan recorded.": "நடப்புப் பிசியோதெரபி திட்டம் பதிவு இல்லை.",
"No physiotherapy sessions recorded.": "பிசியோதெரபி அமர்வுகள் பதிவு இல்லை.",
"No notes recorded.": "குறிப்புகள் பதிவு இல்லை.",
"Bills, payments and outstanding amount": "பில்கள், செலுத்தியவை, நிலுவைத் தொகை",
"Download Ledger PDF": "கணக்கேடு PDF பதிவிறக்கு",
"Terms & Conditions": "விதிமுறைகள் & நிபந்தனைகள்",
"Privacy Policy": "தனியுரிமைக் கொள்கை",
"Refund & Cancellation": "பணத்திருப்பம் & ரத்து",
"Contact Us": "தொடர்பு கொள்ள",
"Total Charges": "மொத்தக் கட்டணம்",
"Loading ERP ledger": "ERP கணக்கேடு ஏற்றப்படுகிறது",
"ERP ledger": "ERP கணக்கேடு",
"Payments / Advance": "செலுத்தியவை / முன்பணம்",
"Received": "பெறப்பட்டது",
"Current balance": "நடப்பு இருப்பு",
"Advance Balance": "முன்பண இருப்பு",
"In your favour · nothing due": "உங்கள் வரவில் · நிலுவை இல்லை",
"All bills settled": "அனைத்துக் கட்டணங்களும் செலுத்தப்பட்டன",
"Payment pending": "கட்டணம் நிலுவையில் உள்ளது",
"Date": "தேதி",
"Reference": "குறிப்பு எண்",
"Description": "விவரம்",
"Debit": "பற்று",
"Credit": "வரவு",
"Action": "செயல்",
"Balance": "இருப்பு",
"Transaction": "பரிவர்த்தனை",
"Receipt": "ரசீது",
"Advance": "முன்பணம்",
"Payment": "கட்டணம்",
"Charges": "கட்டணங்கள்",
"No patient ledger transactions are available to download.": "பதிவிறக்கக் கணக்கேட்டுப் பரிவர்த்தனைகள் இல்லை.",
"Please allow pop-ups to download the Patient Ledger PDF.": "கணக்கேடு PDF பதிவிறக்க pop-up-களை அனுமதிக்கவும்.",
"✓ All bills settled": "✓ அனைத்துக் கட்டணங்களும் செலுத்தப்பட்டன",
"● Payment pending": "● கட்டணம் நிலுவையில்",
"Final Bill Amount": "இறுதிப் பில் தொகை",
"Amount Paid": "செலுத்திய தொகை",
"Online payment is disabled in Admin Preview": "நிர்வாக முன்னோட்டத்தில் ஆன்லைன் கட்டணம் முடக்கப்பட்டுள்ளது",
"Online payment is disabled in Admin Preview.": "நிர்வாக முன்னோட்டத்தில் ஆன்லைன் கட்டணம் முடக்கப்பட்டுள்ளது.",
"Pay an advance securely through Razorpay": "Razorpay மூலம் பாதுகாப்பாக முன்பணம் செலுத்தவும்",
"No outstanding amount is payable": "செலுத்த வேண்டிய நிலுவை இல்லை",
"Pay the current outstanding securely through Razorpay": "நடப்பு நிலுவையை Razorpay மூலம் பாதுகாப்பாகச் செலுத்தவும்",
"Enter Advance Payment": "முன்பணத் தொகையை உள்ளிடவும்",
"Enter the amount you would like to pay in advance to Samara Assisted Living.": "சமரா அசிஸ்டெட் லிவிங்கிற்கு முன்பணமாகச் செலுத்த விரும்பும் தொகையை உள்ளிடவும்.",
"You can pay any amount as advance. This will be adjusted against future bills.": "எந்தத் தொகையையும் முன்பணமாகச் செலுத்தலாம். இது வருங்காலப் பில்களில் சரிசெய்யப்படும்.",
"Cancel": "ரத்து",
"Continue": "தொடர்க",
"Confirm": "உறுதிசெய்",
"Close": "மூடு",
"Please confirm the details below.": "கீழே உள்ள விவரங்களை உறுதிப்படுத்தவும்.",
"Amount": "தொகை",
"Redirecting to secure payment gateway": "பாதுகாப்பான கட்டண நுழைவாயிலுக்கு அனுப்பப்படுகிறது",
"Please wait for a moment…": "சற்றுக் காத்திருக்கவும்…",
"You will be taken to Razorpay's secure payment page to complete your payment.": "கட்டணத்தை முடிக்க Razorpay-இன் பாதுகாப்பான பக்கத்திற்கு அழைத்துச் செல்லப்படுவீர்கள்.",
"Your payment is secured and encrypted.": "உங்கள் கட்டணம் பாதுகாக்கப்பட்டு மறையாக்கம் செய்யப்படுகிறது.",
"Do not close this window.": "இந்தச் சாளரத்தை மூட வேண்டாம்.",
"Preparing secure payment…": "பாதுகாப்பான கட்டணம் தயாராகிறது…",
"Verifying payment…": "கட்டணம் சரிபார்க்கப்படுகிறது…",
"Advance Payment Successful": "முன்பணம் வெற்றிகரமாகச் செலுத்தப்பட்டது",
"Payment Successful": "கட்டணம் வெற்றிகரமாகச் செலுத்தப்பட்டது",
"Advance received successfully and posted to the Samara ledger.": "முன்பணம் பெறப்பட்டு சமரா கணக்கேட்டில் பதிவு செய்யப்பட்டது.",
"Payment received successfully and posted to the Samara ledger.": "கட்டணம் பெறப்பட்டு சமரா கணக்கேட்டில் பதிவு செய்யப்பட்டது.",
"Amount received": "பெறப்பட்ட தொகை",
"Payment was not completed. No payment has been posted to Samara Accounts.": "கட்டணம் முடிக்கப்படவில்லை. சமரா கணக்கில் எந்தக் கட்டணமும் பதிவு செய்யப்படவில்லை.",
"Unable to start online payment.": "ஆன்லைன் கட்டணத்தைத் தொடங்க முடியவில்லை.",
"Payment service is not configured.": "கட்டணச் சேவை அமைக்கப்படவில்லை.",
"Online payment request failed.": "ஆன்லைன் கட்டணக் கோரிக்கை தோல்வியடைந்தது.",
"Razorpay order could not be prepared.": "Razorpay ஆணையைத் தயாரிக்க முடியவில்லை.",
"Payment could not be verified.": "கட்டணத்தைச் சரிபார்க்க முடியவில்லை.",
"Razorpay Checkout could not be loaded. Please check your internet connection and try again.": "Razorpay பக்கத்தை ஏற்ற முடியவில்லை. இணைய இணைப்பைச் சரிபார்த்து மீண்டும் முயற்சிக்கவும்.",
"Your Family Portal session has expired. Please sign in again.": "உங்கள் குடும்ப போர்டல் அமர்வு காலாவதியானது. மீண்டும் உள்நுழையவும்.",
"This amount will be recorded as an advance payment to Samara Assisted Living and adjusted against future bills.": "இந்தத் தொகை சமரா அசிஸ்டெட் லிவிங்கிற்கான முன்பணமாகப் பதிவு செய்யப்பட்டு வருங்காலப் பில்களில் சரிசெய்யப்படும்.",
"Advance payment": "முன்பணம்",
"Outstanding payment": "நிலுவைக் கட்டணம்",
"Approved resident documents": "அனுமதிக்கப்பட்ட குடியிருப்பாளர் ஆவணங்கள்",
"Loading documents…": "ஆவணங்கள் ஏற்றப்படுகின்றன…",
"No documents available": "ஆவணங்கள் இல்லை",
"No family-visible document metadata recorded.": "குடும்பம் பார்க்கக்கூடிய ஆவணங்கள் பதிவு இல்லை.",
"View": "காண்க",
"Download": "பதிவிறக்கு",
"Open": "திற",
"Family View": "குடும்பப் பார்வை",
"Intelligent Patient Report": "நுண்ணறிவு நோயாளர் அறிக்கை",
"View only": "பார்வைக்கு மட்டும்",
"← Previous Day": "← முந்தைய நாள்",
"Next Day →": "அடுத்த நாள் →",
"Loading report…": "அறிக்கை ஏற்றப்படுகிறது…",
"All": "அனைத்தும்",
"Nursing Procedures": "செவிலியர் நடைமுறைகள்",
"Food & Diet": "உணவு & உணவுமுறை",
"No records in this category today": "இன்று இந்தப் பிரிவில் பதிவுகள் இல்லை",
"Choose another category or View all for date-wise history.": "வேறு பிரிவைத் தேர்வு செய்யவும் அல்லது தேதிவாரியான வரலாற்றுக்கு 'அனைத்தையும் காண்க' அழுத்தவும்.",
"No records for this date.": "இந்தத் தேதிக்குப் பதிவுகள் இல்லை.",
"No patient activity records for this date.": "இந்தத் தேதிக்கு நோயாளர் செயல்பாட்டுப் பதிவுகள் இல்லை.",
"View-only family report generated from the resident": "குடியிருப்பாளர் பதிவுகளிலிருந்து உருவான குடும்பப் பார்வை அறிக்கை",
"Thank you for trusting us with": "உங்கள் அன்புக்குரியவரின் பராமரிப்பை",
"your loved one’s care.": "எங்களிடம் நம்பி ஒப்படைத்ததற்கு நன்றி.",
"COMPASSION • COMFORT • DIGNITY": "கருணை • ஆறுதல் • கண்ணியம்",
"Duration": "கால அளவு",
"Procedure": "நடைமுறை",
"Send an admission enquiry to Samara": "சமராவுக்குச் சேர்க்கை விசாரணை அனுப்புங்கள்",
"Admin / Manager review": "நிர்வாகி / மேலாளர் பரிசீலனை",
"You may enquire for a family member or another person requiring assisted-living care. The request will be sent securely to Samara Admin / Manager.": "குடும்ப உறுப்பினருக்கோ, உதவியுடன் கூடிய பராமரிப்பு தேவைப்படும் வேறொருவருக்கோ நீங்கள் விசாரிக்கலாம். கோரிக்கை சமரா நிர்வாகி / மேலாளருக்குப் பாதுகாப்பாக அனுப்பப்படும்.",
"Resident Name": "குடியிருப்பாளர் பெயர்",
"Age": "வயது",
"Contact Person": "தொடர்பு நபர்",
"Mobile Number": "கைபேசி எண்",
"Care Type": "பராமரிப்பு வகை",
"Direct Elderly Care": "நேரடி முதியோர் பராமரிப்பு",
"Hospital Discharge Recovery": "மருத்துவமனையிலிருந்து திரும்பிய பின் மீட்பு",
"Short Stay / Respite": "குறுகிய காலத் தங்கல் / ஓய்வுப் பராமரிப்பு",
"Long-Term Assisted Living": "நீண்டகால உதவியுடன் கூடிய வாழ்க்கை",
"Physiotherapy Support": "பிசியோதெரபி உதவி",
"Special / Dedicated Nurse": "சிறப்பு / தனிச் செவிலியர்",
"Preferred Room": "விருப்பமான அறை",
"Private": "தனி அறை",
"Twin Sharing": "இருவர் பகிர்வு",
"General": "பொது",
"Need Guidance": "வழிகாட்டுதல் தேவை",
"Current Condition / Requirements": "தற்போதைய உடல்நிலை / தேவைகள்",
"Send Admission Enquiry": "சேர்க்கை விசாரணையை அனுப்பு",
"How it works": "இது எப்படிச் செயல்படுகிறது",
"Submit securely": "பாதுகாப்பாகச் சமர்ப்பிக்கவும்",
"The enquiry is recorded directly in Samara Care ERP.": "விசாரணை நேரடியாகச் சமரா கேர் ERP-இல் பதிவாகும்.",
"Management review": "நிர்வாகப் பரிசீலனை",
"Admin / Manager will see it immediately in Overview and Admission → Enquiries.": "நிர்வாகி / மேலாளர் அதை உடனே Overview மற்றும் Admission → Enquiries-இல் காண்பார்.",
"Follow-up": "தொடர் நடவடிக்கை",
"Samara will contact the mobile number entered in the enquiry.": "விசாரணையில் கொடுத்த கைபேசி எண்ணில் சமரா தொடர்பு கொள்ளும்.",
"Sending your admission enquiry securely to Samara…": "உங்கள் சேர்க்கை விசாரணை சமராவுக்குப் பாதுகாப்பாக அனுப்பப்படுகிறது…",
"✓ Admission enquiry sent successfully. Samara Admin / Manager can now see it in ERP Overview and Enquiries.": "✓ சேர்க்கை விசாரணை வெற்றிகரமாக அனுப்பப்பட்டது. சமரா நிர்வாகி / மேலாளர் இப்போது அதை ERP-இல் காணலாம்.",
"Unable to send admission enquiry.": "சேர்க்கை விசாரணையை அனுப்ப முடியவில்லை.",
"Family Visits": "குடும்பச் சந்திப்புகள்",
"Request or review visits": "சந்திப்பைக் கோரவும் அல்லது பார்க்கவும்",
"Subject to confirmation": "உறுதிப்படுத்தலுக்கு உட்பட்டது",
"Request a Visit": "சந்திப்பைக் கோருக",
"Visitor Name": "வருகையாளர் பெயர்",
"Preferred Date": "விருப்பமான தேதி",
"Morning": "காலை",
"Afternoon": "மதியம்",
"Evening": "மாலை",
"Message": "செய்தி",
"Send Visit Request": "சந்திப்புக் கோரிக்கையை அனுப்பு",
"Previous Requests": "முந்தைய கோரிக்கைகள்",
"Loading visit requests…": "சந்திப்புக் கோரிக்கைகள் ஏற்றப்படுகின்றன…",
"No visit requests submitted yet.": "இதுவரை சந்திப்புக் கோரிக்கைகள் இல்லை.",
"Awaiting manager confirmation": "மேலாளர் உறுதிப்படுத்தலுக்குக் காத்திருக்கிறது",
"Sending securely to Samara…": "சமராவுக்குப் பாதுகாப்பாக அனுப்பப்படுகிறது…",
"Unable to load visit requests.": "சந்திப்புக் கோரிக்கைகளை ஏற்ற முடியவில்லை.",
"Secure family communication": "பாதுகாப்பான குடும்பத் தொடர்பு",
"Secure ERP connection": "பாதுகாப்பான ERP இணைப்பு",
"Loading secure messages…": "பாதுகாப்பான செய்திகள் ஏற்றப்படுகின்றன…",
"Type a message to the care team": "பராமரிப்புக் குழுவுக்குச் செய்தியை எழுதவும்",
"Send Message": "செய்தியை அனுப்பு",
"No messages yet. You can send a secure message below.": "இதுவரை செய்திகள் இல்லை. கீழே பாதுகாப்பான செய்தியை அனுப்பலாம்.",
"Sending securely…": "பாதுகாப்பாக அனுப்பப்படுகிறது…",
"You": "நீங்கள்",
"Samara Team": "சமரா குழு",
"Unable to load messages.": "செய்திகளை ஏற்ற முடியவில்லை.",
"Your Voice Matters": "உங்கள் கருத்து முக்கியம்",
"Feedback to Samara": "சமராவுக்குக் கருத்து",
"Share Your Experience": "உங்கள் அனுபவத்தைப் பகிருங்கள்",
"You may submit feedback as an authorised family member or on behalf of the resident.": "அங்கீகரிக்கப்பட்ட குடும்ப உறுப்பினராகவோ, குடியிருப்பாளர் சார்பாகவோ கருத்தைச் சமர்ப்பிக்கலாம்.",
"You Are": "நீங்கள்",
"Resident / Patient": "குடியிருப்பாளர் / நோயாளர்",
"Category": "பிரிவு",
"Overall Experience": "ஒட்டுமொத்த அனுபவம்",
"Nursing Care": "செவிலியர் பராமரிப்பு",
"Caregiver Support": "பராமரிப்பாளர் உதவி",
"Rooms & Facilities": "அறைகள் & வசதிகள்",
"Administration": "நிர்வாகம்",
"Family Communication": "குடும்பத் தொடர்பு",
"Compliment": "பாராட்டு",
"Suggestion": "ஆலோசனை",
"Complaint / Concern": "புகார் / கவலை",
"Other": "மற்றவை",
"Rating": "மதிப்பீடு",
"Subject": "தலைப்பு",
"I would like Samara to respond to this feedback in the Family Portal.": "இந்தக் கருத்துக்குச் சமரா குடும்ப போர்டலில் பதிலளிக்க விரும்புகிறேன்.",
"Submit Feedback": "கருத்தைச் சமர்ப்பி",
"Previous Feedback": "முந்தைய கருத்துகள்",
"Management Responses": "நிர்வாகத்தின் பதில்கள்",
"Loading feedback history…": "கருத்து வரலாறு ஏற்றப்படுகிறது…",
"No feedback submitted yet.": "இதுவரை கருத்துகள் சமர்ப்பிக்கப்படவில்லை.",
"Unable to load feedback history.": "கருத்து வரலாற்றை ஏற்ற முடியவில்லை.",
"Please sign in to view feedback history.": "கருத்து வரலாற்றைப் பார்க்க உள்நுழையவும்.",
"Samara Management Response": "சமரா நிர்வாகத்தின் பதில்",
"Please choose a new 6-digit Access PIN.": "புதிய 6 இலக்க Access PIN-ஐத் தேர்வு செய்யவும்.",
"The two PINs do not match.": "இரண்டு PIN-களும் பொருந்தவில்லை.",
"Please choose a different PIN from the temporary PIN.": "தற்காலிக PIN-இலிருந்து வேறுபட்ட PIN-ஐத் தேர்வு செய்யவும்.",
"Your secure session has expired. Please sign in again.": "உங்கள் பாதுகாப்பான அமர்வு காலாவதியானது. மீண்டும் உள்நுழையவும்.",
"Saving your new private PIN…": "உங்கள் புதிய PIN சேமிக்கப்படுகிறது…",
"Unable to change PIN.": "PIN-ஐ மாற்ற முடியவில்லை.",
"✓ New Access PIN saved successfully. Please sign in with your new PIN.": "✓ புதிய Access PIN சேமிக்கப்பட்டது. புதிய PIN மூலம் உள்நுழையவும்.",
"Unable to save the new PIN. Please try again.": "புதிய PIN-ஐச் சேமிக்க முடியவில்லை. மீண்டும் முயற்சிக்கவும்.",
"Please enter the Patient ID.": "Patient ID-ஐ உள்ளிடவும்.",
"Please enter the 6-digit Access PIN.": "6 இலக்க Access PIN-ஐ உள்ளிடவும்.",
"Family Portal connection is unavailable. Please contact Samara.": "குடும்ப போர்டல் இணைப்பு கிடைக்கவில்லை. சமராவைத் தொடர்பு கொள்ளவும்.",
"Checking secure family access…": "பாதுகாப்பான குடும்ப அணுகல் சரிபார்க்கப்படுகிறது…",
"Patient ID or Access PIN is incorrect, or Family Portal access is disabled.": "Patient ID அல்லது Access PIN தவறானது, அல்லது குடும்ப போர்டல் அணுகல் முடக்கப்பட்டுள்ளது.",
"Unable to read the resident record.": "குடியிருப்பாளர் பதிவைப் படிக்க முடியவில்லை.",
"Unable to load the resident information. Please contact Samara if the problem continues.": "குடியிருப்பாளர் தகவலை ஏற்ற முடியவில்லை. பிரச்சினை தொடர்ந்தால் சமராவைத் தொடர்பு கொள்ளவும்.",
"Your secure Family Portal session is unavailable. Please sign in again.": "உங்கள் குடும்ப போர்டல் அமர்வு கிடைக்கவில்லை. மீண்டும் உள்நுழையவும்.",
"Family Portal session expired or access disabled.": "குடும்ப போர்டல் அமர்வு காலாவதியானது அல்லது அணுகல் முடக்கப்பட்டுள்ளது.",
"Welcome": "வருக",
"Unable to load Admin Preview. Please close this tab and open Preview Family Portal again from ERP.": "நிர்வாக முன்னோட்டத்தை ஏற்ற முடியவில்லை. இந்த டேபை மூடி, ERP-இலிருந்து மீண்டும் திறக்கவும்.",
"Samara Assisted Living inauguration invitation": "சமரா அசிஸ்டெட் லிவிங் திறப்பு விழா அழைப்பிதழ்",
"Close inauguration invitation": "அழைப்பிதழை மூடு",
"Fondly known as Mrs. Chella Boomi": "திருமதி செல்லா பூமி என அனைவராலும் அன்புடன் அழைக்கப்படுபவர்",
"Dr. Krishnan Chellammal": "டாக்டர் கிருஷ்ணன் செல்லம்மாள்",
"Dr. Maneesha Boominathan": "டாக்டர் மணீஷா பூமிநாதன்",
"Director, Samara Health Care LLP": "இயக்குநர், சமரா ஹெல்த் கேர் எல்எல்பி",
"A lifetime devoted to nursing — and to the people it serves.": "செவிலியர் பணிக்கும், அதன் வழியே மக்கள் நலனுக்கும் தன் வாழ்நாளை அர்ப்பணித்தவர்.",
"Dr. Krishnan Chellammal is a senior nursing and healthcare leader whose career spans more than 35 years of clinical care, nursing administration and hospital management.": "டாக்டர் கிருஷ்ணன் செல்லம்மாள் அவர்கள், செவிலியர் மற்றும் சுகாதார மேலாண்மைத் துறையில் 35 ஆண்டுகளுக்கும் மேலான அனுபவம் கொண்ட மூத்த தலைவர். நோயாளர் பராமரிப்பு, செவிலியர் நிர்வாகம், மருத்துவமனை மேலாண்மை ஆகிய மூன்றிலும் நீண்ட பணி அனுபவம் பெற்றவர்.",
"Over these years, she has held senior leadership positions in some of the most respected healthcare institutions in India and abroad — Apollo Hospitals, Apollo Proton Cancer Centre, Kauvery Hospital, Kovai Medical Center and Hospital (KMCH), Sri Ramachandra Medical College (SRMC), Dr. Mehta’s Hospitals and King Fahd Specialist Hospital.": "இந்தியாவிலும் வெளிநாட்டிலும் உள்ள பல புகழ்பெற்ற மருத்துவமனைகளில் அவர் உயர் பொறுப்புகளை வகித்துள்ளார். அப்போலோ மருத்துவமனைகள், அப்போலோ புரோட்டான் புற்றுநோய் மையம், காவேரி மருத்துவமனை, கோவை மெடிக்கல் சென்டர் அண்ட் ஹாஸ்பிடல் (KMCH), ஸ்ரீ ராமச்சந்திரா மருத்துவக் கல்லூரி (SRMC), டாக்டர் மேத்தாஸ் மருத்துவமனைகள், கிங் ஃபஹத் சிறப்பு மருத்துவமனை ஆகியவை அவற்றுள் சில.",
"As Chief Nursing Officer and Group Head – Nursing at KMCH, she led a team of nearly 1,500 nursing professionals across the group. Earlier, as Nursing Director and Chief Nursing Officer at Kauvery Hospital, Chennai, she helped build its nursing services from the ground up, beginning at the project stage.": "KMCH மருத்துவமனைக் குழுமத்தில் தலைமைச் செவிலியர் அலுவலராகவும், செவிலியர் பிரிவின் குழுமத் தலைவராகவும் பணியாற்றி, சுமார் 1,500 செவிலியர்களை வழிநடத்தினார். அதற்கு முன்பு, சென்னை காவேரி மருத்துவமனையில் செவிலியர் இயக்குநராகவும் தலைமைச் செவிலியர் அலுவலராகவும் இருந்து, மருத்துவமனை தொடங்கப்பட்ட காலத்திலிருந்தே அதன் செவிலியர் சேவைகளைக் கட்டியெழுப்பியதில் முக்கியப் பங்காற்றினார்.",
"She holds an M.Sc. (Nursing), an MBA in Health Care Services from Anna University and a Ph.D. in Hospital Management from Bharathiar University. Her contribution to the profession has been recognised with the Excellence in Nursing Award from the Association of Healthcare Providers (India) – AHPI.": "செவிலியத்தில் முதுநிலைப் பட்டம் (M.Sc. Nursing), அண்ணா பல்கலைக்கழகத்தில் சுகாதாரச் சேவைகள் பிரிவில் எம்.பி.ஏ., பாரதியார் பல்கலைக்கழகத்தில் மருத்துவமனை மேலாண்மையில் முனைவர் பட்டம் (Ph.D.) ஆகியவற்றைப் பெற்றவர். செவிலியர் துறையில் அவர் ஆற்றிய சிறந்த பணிக்காக, இந்திய சுகாதார சேவை வழங்குநர்கள் சங்கம் (AHPI) அவருக்கு ‘செவிலியர் சேவைச் சிறப்பு விருது’ வழங்கிக் கௌரவித்துள்ளது.",
"At Samara, she brings these decades of experience to a single purpose — care that is safe, compassionate and dignified, where professional healthcare standards meet the warmth and personal attention of a caring environment.": "இத்தனை ஆண்டுகால அனுபவத்துடன், சமராவில் அவர் ஒரே இலக்கை நோக்கிப் பணியாற்றுகிறார் — ஒவ்வொருவருக்கும் பாதுகாப்பான, கருணை நிறைந்த, கண்ணியமான பராமரிப்பு. உயர்ந்த மருத்துவத் தரத்துடன், அக்கறை நிறைந்த சூழலின் அரவணைப்பையும் தனிப்பட்ட கவனிப்பையும் இணைப்பதே அவரது நோக்கம்.",
"A Note from Our Director": "எங்கள் இயக்குநரின் குறிப்பு",
"When we envisioned Samara Health Care LLP, the goal was never just to offer treatments; it was to build a sanctuary of trust and genuine care. Entering the medical field has given me both the scientific foundation and the moral clarity to realize that sustainable well-being must be inclusive and accessible.": "சமரா ஹெல்த் கேர் எல்எல்பி-யை நாங்கள் கனவு கண்டபோது, வெறும் சிகிச்சை அளிப்பது மட்டும் எங்கள் நோக்கமாக இருக்கவில்லை; நம்பிக்கையும் உண்மையான அக்கறையும் நிறைந்த ஒரு புகலிடத்தை உருவாக்குவதே எங்கள் இலக்கு. மருத்துவத் துறையில் நான் அடியெடுத்து வைத்தது, எனக்கு அறிவியல் அடித்தளத்தையும், நீடித்த நல்வாழ்வு அனைவரையும் உள்ளடக்கியதாகவும் அனைவருக்கும் எட்டக்கூடியதாகவும் இருக்க வேண்டும் என்ற தெளிவையும் தந்தது.",
"My promise to every individual who walks through our doors is simple: compassionate listening, uncompromising quality, and an unwavering commitment to your health. Together with our dedicated team, I look forward to serving our community with grace, purpose, and heart.": "எங்கள் வாசலைக் கடந்து வரும் ஒவ்வொருவருக்கும் நான் அளிக்கும் வாக்குறுதி எளிமையானது: கனிவுடன் செவிமடுத்தல், சமரசமில்லாத தரம், உங்கள் உடல்நலனில் தளராத அர்ப்பணிப்பு. எங்கள் அர்ப்பணிப்புள்ள குழுவுடன் இணைந்து, கண்ணியத்துடனும், நோக்கத்துடனும், முழு மனதுடனும் நம் சமூகத்திற்குச் சேவை செய்ய ஆவலுடன் இருக்கிறேன்.",
"Dr. Krishnan Chellammal, Director, Samara Health Care LLP": "டாக்டர் கிருஷ்ணன் செல்லம்மாள், இயக்குநர், சமரா ஹெல்த் கேர் எல்எல்பி",
"Dr. Maneesha Boominathan, Director, Samara Health Care LLP": "டாக்டர் மணீஷா பூமிநாதன், இயக்குநர், சமரா ஹெல்த் கேர் எல்எல்பி",
"Confirm Advance Payment": "முன்பணக் கட்டணத்தை உறுதிசெய்",
"Confirm Outstanding Payment": "நிலுவைக் கட்டணத்தை உறுதிசெய்"
};
  var REV={};Object.keys(DICT).forEach(function(k){REV[DICT[k]]=k;});
  var LOWER={};Object.keys(DICT).forEach(function(k){LOWER[k.toLowerCase()]=DICT[k];});
  function word(s){return DICT[s]||LOWER[(s||'').toLowerCase()]||null;}

  // Sentences that mix fixed words with live values.
  var PATTERNS=[
    [/^(Pulse|Temp|Temperature|Sugar|Blood Sugar|Blood Pressure|BP|Duration|Amount|Balance) ([^·—–]+)$/,function(m){return (DICT[m[1]]||m[1])+' '+m[2];}],
    [/^(\d+) care activit(?:y|ies) recorded today$/,function(m){return 'இன்று '+m[1]+' பராமரிப்புச் செயல்பாடுகள் பதிவாகியுள்ளன';}],
    [/^(\d+) active medicine orders?$/,function(m){return m[1]+' நடப்பு மருந்து ஆணைகள்';}],
    [/^Available for (\d+) more days?$/,function(m){return 'இன்னும் '+m[1]+' நாட்கள் கிடைக்கும்';}],
    [/^(\d+) records?$/,function(m){return m[1]+' பதிவுகள்';}],
    [/^Room (.+)$/,function(m){return 'அறை '+m[1];}],
    [/^Bed (.+)$/,function(m){return 'படுக்கை '+m[1];}],
    [/^Family Portal (v[\d.]+)$/,function(m){return 'குடும்ப போர்டல் '+m[1];}],
    [/^Samara Family Portal ([\d.]+)$/,function(m){return 'சமரா குடும்ப போர்டல் '+m[1];}],
    [/^Authorised family: (.+)$/,function(m){return 'அங்கீகரிக்கப்பட்ட குடும்பம்: '+m[1];}],
    [/^Viewing as (.+)$/,function(m){return m[1]+' ஆகப் பார்க்கிறீர்கள்';}],
    [/^Admin preview$/,function(){return 'நிர்வாக முன்னோட்டம்';}],
    [/^No family login or Last Login update$/,function(){return 'குடும்ப உள்நுழைவு / கடைசி உள்நுழைவு பதிவு செய்யப்படாது';}],
    [/^Welcome (.+)\. Please replace the temporary PIN with your own private 6-digit PIN\.$/,function(m){return 'வருக '+m[1]+'. தற்காலிக PIN-ஐ உங்கள் சொந்த 6 இலக்க PIN-ஆக மாற்றவும்.';}],
    [/^Discharged on (.+)$/,function(m){return m[1]+' அன்று டிஸ்சார்ஜ் செய்யப்பட்டார்';}],
    [/^No (.+) records for this date\.$/,function(m){var w=word(m[1]);return 'இந்தத் தேதிக்கு '+(w||m[1])+' பதிவுகள் இல்லை.';}],
    [/^(Medicine|Food & Diet|Nursing Procedure|Daily Moments): (.*)$/,function(m){return word(m[1])+': '+(word(m[2])||m[2]);}],
    [/^Confirm (Advance|Outstanding) Payment$/,function(m){return (m[1]==='Advance'?'முன்பணக்':'நிலுவைக்')+' கட்டணத்தை உறுதிசெய்';}],
    [/^Pay Outstanding (.+)$/,function(m){return 'நிலுவையைச் செலுத்து '+m[1];}],
    [/^Generated on:(.*)$/,function(m){return 'உருவாக்கிய நாள்:'+m[1];}]
  ];

  function toTamil(en){
    var s=en.trim(); if(!s) return null;
    var w=word(s); if(w) return w;
    var pre=s.match(/^([^A-Za-z0-9\u0B80-\u0BFF]+)(.+)$/); // leading icon such as "✦ About Us"
    if(pre){var inner=toTamil(pre[2]); if(inner) return pre[1]+inner;}
    for(var i=0;i<PATTERNS.length;i++){var m=s.match(PATTERNS[i][0]);if(m){var r=PATTERNS[i][1](m);if(r)return r;}}
    // Split joined phrases such as "Daily care — Completed" or "Room 109 · Bed C" and translate each part.
    var seps=[' · ',' — ',' – '];
    for(var j=0;j<seps.length;j++){
      if(s.indexOf(seps[j])>0){
        var parts=s.split(seps[j]),changed=false;
        parts=parts.map(function(p){var t=toTamil(p);if(t){changed=true;return t;}return p;});
        if(changed) return parts.join(seps[j]);
      }
    }
    return null;
  }

  function toEnglish(t){ // for text the app copied while Tamil was showing (e.g. the page heading)
    if(REV[t]) return REV[t];
    var pre=t.match(/^([^A-Za-z0-9\u0B80-\u0BFF]+)(.+)$/);
    if(pre&&REV[pre[2]]) return pre[1]+REV[pre[2]];
    return null;
  }
  var lang='en';
  var state=new WeakMap(); // text node -> {en, ta}
  var SKIP='script,style,textarea,[data-no-i18n],.lang-switch';
  var SKIP_ATTR='script,style,[data-no-i18n],.lang-switch';

  function setText(node){
    var p=node.parentElement; if(!p||p.closest(SKIP)) return;
    var cur=node.nodeValue, st=state.get(node);
    if(!st||(cur!==st.en&&cur!==st.ta)){
      // New or app-changed text: work out its English source.
      var t=cur.trim(), en=cur, back=toEnglish(t); if(back) en=cur.replace(t,back);
      st={en:en,ta:null}; state.set(node,st);
      var ta=toTamil(en);
      if(ta){var lead=(en.match(/^\s*/)||[''])[0],trail=(en.match(/\s*$/)||[''])[0];st.ta=lead+ta+trail;}
    }
    var want=(lang==='ta'&&st.ta)?st.ta:st.en;
    if(node.nodeValue!==want) node.nodeValue=want;
  }
  var ATTRS=['placeholder','aria-label','title','alt'];
  function setAttrs(el){
    if(el.closest&&el.closest(SKIP_ATTR)) return;
    if(el.tagName==='OPTION'&&!el.hasAttribute('value')) el.setAttribute('value',el.textContent.trim()); // keep the ERP value in English
    ATTRS.forEach(function(a){
      if(!el.hasAttribute(a)) return;
      var key='data-i18n-'+a, cur=el.getAttribute(a), en=el.getAttribute(key);
      if(en===null||(cur!==en&&cur!==(toTamil(en)||en))){en=REV[cur]||cur;el.setAttribute(key,en);}
      var want=lang==='ta'?(toTamil(en)||en):en;
      if(cur!==want) el.setAttribute(a,want);
    });
  }
  function walk(root){
    if(!root) return;
    if(root.nodeType===3){setText(root);return;}
    if(root.nodeType!==1&&root.nodeType!==9&&root.nodeType!==11) return;
    if(root.nodeType===1){ setAttrs(root); if(root.closest(SKIP)) return; }
    var tw=document.createTreeWalker(root,NodeFilter.SHOW_ELEMENT|NodeFilter.SHOW_TEXT,{acceptNode:function(n){
      if(n.nodeType===1&&n.matches(SKIP)){ setAttrs(n); return NodeFilter.FILTER_REJECT; } return NodeFilter.FILTER_ACCEPT;}});
    var n; while((n=tw.nextNode())){ if(n.nodeType===3) setText(n); else setAttrs(n); }
  }
  var TITLE_EN=null;
  function applyAll(){
    document.documentElement.lang=lang==='ta'?'ta':'en';
    document.documentElement.classList.toggle('lang-ta',lang==='ta');
    walk(document.body);
    if(TITLE_EN===null||(document.title!==TITLE_EN&&document.title!==(toTamil(TITLE_EN)||TITLE_EN))) TITLE_EN=REV[document.title]||document.title;
    document.title=lang==='ta'?(toTamil(TITLE_EN)||TITLE_EN):TITLE_EN;
    document.querySelectorAll('.lang-switch button').forEach(function(b){
      var on=b.getAttribute('data-lang')===lang; b.classList.toggle('active',on); b.setAttribute('aria-pressed',on?'true':'false');
    });
  }
  function setLang(l){lang=l==='ta'?'ta':'en';try{localStorage.setItem(STORE,lang);}catch(e){}applyAll();}

  function makeSwitch(extra){
    var d=document.createElement('div');
    d.className='lang-switch '+(extra||'');d.setAttribute('role','group');d.setAttribute('aria-label','Language / மொழி');
    d.innerHTML='<button type="button" data-lang="en">English</button><button type="button" data-lang="ta" lang="ta">தமிழ்</button>';
    d.addEventListener('click',function(e){var b=e.target.closest('button[data-lang]');if(b)setLang(b.getAttribute('data-lang'));});
    return d;
  }
  function init(){
    try{lang=localStorage.getItem(STORE)==='ta'?'ta':'en';}catch(e){lang='en';}
    var actions=document.querySelector('.portal-header .header-actions');
    if(actions&&!actions.querySelector('.lang-switch')) actions.insertBefore(makeSwitch('lang-switch-header'),actions.firstChild);
    document.querySelectorAll('.login-shell').forEach(function(shell){ // phones: switch at the very top
      if(!shell.querySelector('.lang-switch-top')) shell.insertBefore(makeSwitch('lang-switch-top'),shell.firstChild);
    });
    document.querySelectorAll('.login-card').forEach(function(card){
      if(!card.querySelector('.lang-switch')) card.insertBefore(makeSwitch('lang-switch-login'),card.firstChild);
    });
    applyAll();
    var pending=new Set(),queued=false;
    new MutationObserver(function(recs){
      recs.forEach(function(r){
        if(r.type==='characterData') pending.add(r.target);
        else if(r.type==='attributes') pending.add(r.target);
        else r.addedNodes.forEach(function(n){pending.add(n);});
      });
      if(!queued){queued=true;requestAnimationFrame(function(){queued=false;var list=Array.from(pending);pending.clear();list.forEach(function(n){if(n.isConnected)walk(n);});});}
    }).observe(document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:ATTRS});
  }
  window.SamaraFamilyLanguage={set:setLang,get:function(){return lang;}};
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();
