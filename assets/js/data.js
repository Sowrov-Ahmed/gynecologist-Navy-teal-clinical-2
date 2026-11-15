/* Single source of truth for all site content. Owned by the Team Lead. DO NOT EDIT. */
window.SITE = {
  doctor: {
    name: 'Dr. Rukhsana Alam',
    initials: 'RA',
    title: 'Consultant Gynecologist, Obstetrician & Laparoscopic Surgeon',
    role: 'Gynecology & Obstetrics',
    degrees: 'MBBS, MS (Obs & Gynae)',
    degreesFull: 'MBBS (Mymensingh Medical College), MS (Obstetrics & Gynecology), Fellowship in Laparoscopic Surgery (Kuala Lumpur)',
    bmdc: 'A-52946',
    experience: 18,
    stats: { experience: 18, patients: 25000, deliveries: 6000, surgeries: 3200, publications: 22, rating: 4.8, reviews: 2140 },
    phone: '+880 1819-336472',
    phoneHref: 'tel:+8801819336472',
    whatsapp: 'https://wa.me/8801819336472',
    email: 'appointments@drrukhsanaalam.com',
    languages: ['Bangla', 'English'],
    social: {
      facebook: 'https://www.facebook.com/drrukhsanaalam',
      linkedin: 'https://www.linkedin.com/in/drrukhsanaalam',
      youtube: 'https://www.youtube.com/@drrukhsanaalam',
      instagram: 'https://www.instagram.com/drrukhsanaalam'
    },
    tagline: 'Careful, evidence-based women\'s healthcare, from pregnancy to menopause.',
    bio: [
      'Dr. Rukhsana Alam is a consultant gynecologist and obstetrician with 18 years of experience in high-risk pregnancy, infertility and laparoscopic surgery.',
      'She is an Associate Professor and sees patients at three chambers in Dhaka and Chattogram, explaining every diagnosis and option in plain Bangla or English.'
    ],
    points: ['Clear explanation of every diagnosis and option', 'Treatment guided by current international guidelines', 'Long-term follow-up from pregnancy to menopause'],
    experienceList: [
      { year: '2019 – Present', title: 'Associate Professor & Consultant', place: "Department of Obstetrics & Gynecology, Metro Women's & Children's Hospital" },
      { year: '2012 – 2019', title: 'Assistant Professor', place: 'Department of Obstetrics & Gynecology, Capital Medical College Hospital' },
      { year: '2009 – 2012', title: 'Registrar, Obstetrics & Gynecology', place: 'Greenfield Specialized Hospital' }
    ],
    education: [
      { year: '2013 – 2014', title: 'Fellowship, Laparoscopic Surgery', place: 'Kuala Lumpur, Malaysia' },
      { year: '2005 – 2008', title: 'MS (Obstetrics & Gynecology)', place: 'Bangabandhu Sheikh Mujib Medical University' },
      { year: '1996 – 2002', title: 'MBBS', place: 'Mymensingh Medical College' }
    ],
    memberships: ['Bangladesh Medical & Dental Council (BMDC)', 'Obstetrical & Gynaecological Society of Bangladesh (OGSB)', 'Bangladesh Society of Laparoscopic Surgeons'],
    expertise: ['High-risk pregnancy', 'Normal & caesarean delivery', 'Infertility & IVF guidance', 'PCOS & menstrual disorders', 'Laparoscopic & hysteroscopic surgery', 'Cancer screening & menopause'],
    values: [
      { title: 'Listen first', text: 'Every consultation begins with your story and your questions.', icon: 'message' },
      { title: 'Explain clearly', text: 'Reports and options in plain language, so you decide with confidence.', icon: 'file-text' },
      { title: 'Follow through', text: 'Planned follow-ups so no result or symptom is left unanswered.', icon: 'calendar-check' }
    ]
  },

  photos: {
    hallway: { src: 'assets/images/doctor-hallway.webp', w: 1280, h: 714, pos: 'object-[64%_center]', alt: 'Dr. Rukhsana Alam smiling with a patient chart in a bright hospital corridor' },
    cutout: { src: 'assets/images/doctor-cutout.webp', w: 700, h: 700, pos: 'object-top', alt: 'Portrait of Dr. Rukhsana Alam in a white coat with a stethoscope' },
    window: { src: 'assets/images/doctor-window.webp', w: 1280, h: 714, pos: 'object-[78%_center]', alt: 'Dr. Rukhsana Alam looking out over the hospital campus from a tall window' },
    tablet: { src: 'assets/images/doctor-tablet.webp', w: 1200, h: 896, pos: 'object-[72%_center]', alt: 'Dr. Rukhsana Alam reviewing patient records on a tablet in her consulting room' },
    listening: { src: 'assets/images/doctor-listening.webp', w: 1200, h: 896, pos: 'object-[55%_center]', alt: 'Dr. Rukhsana Alam listening attentively to a patient' }
  },

  nav: [
    { key: 'home', label: 'Home', href: 'index.html' },
    { key: 'about', label: 'About', href: 'about.html' },
    { key: 'services', label: 'Services', href: 'services.html' },
    { key: 'chambers', label: 'Chambers', href: 'chambers.html' },
    { key: 'contact', label: 'Contact', href: 'contact.html' }
  ],

  chambers: [
    {
      id: 'gulshan', name: "Metro Women's & Children's Hospital", area: 'Gulshan', city: 'Dhaka',
      address: 'Plot 41, Road 103, Gulshan-2, Dhaka 1212',
      days: ['Sat', 'Mon', 'Wed'], weekdays: [6, 1, 3],
      time: '5:00 PM – 9:00 PM', start: '17:00', end: '21:00', slotMin: 15,
      fee: { new: 1800, followup: 1000 }, phone: '+880 1819-336472',
      mapEmbed: 'https://www.google.com/maps?q=Road+103+Gulshan+2+Dhaka&output=embed',
      mapLink: 'https://www.google.com/maps/search/?api=1&query=Road+103+Gulshan+2+Dhaka',
      features: ['In-house ultrasound', 'Delivery & operation theatre', 'Pharmacy and lab'],
      note: 'Main chamber, where deliveries and surgeries are performed.'
    },
    {
      id: 'mirpur', name: 'Greenfield Specialized Hospital', area: 'Mirpur', city: 'Dhaka',
      address: 'Section 10, Mirpur, Dhaka 1216',
      days: ['Sun', 'Tue', 'Thu'], weekdays: [0, 2, 4],
      time: '3:00 PM – 7:00 PM', start: '15:00', end: '19:00', slotMin: 15,
      fee: { new: 1500, followup: 800 }, phone: '+880 1819-336472',
      mapEmbed: 'https://www.google.com/maps?q=Section+10+Mirpur+Dhaka&output=embed',
      mapLink: 'https://www.google.com/maps/search/?api=1&query=Section+10+Mirpur+Dhaka',
      features: ['Antenatal clinic', 'Digital X-ray and lab', 'Lift and wheelchair access'],
      note: 'Convenient for Mirpur, Pallabi and Uttara patients.'
    },
    {
      id: 'chattogram', name: 'Port City Care Hospital', area: 'GEC Circle', city: 'Chattogram',
      address: 'CDA Avenue, GEC Circle, Chattogram 4000',
      days: ['Fri'], weekdays: [5],
      time: '10:00 AM – 2:00 PM', start: '10:00', end: '14:00', slotMin: 15,
      fee: { new: 1200, followup: 600 }, phone: '+880 1819-336472',
      mapEmbed: 'https://www.google.com/maps?q=GEC+Circle+Chattogram&output=embed',
      mapLink: 'https://www.google.com/maps/search/?api=1&query=GEC+Circle+Chattogram',
      features: ['Women-only waiting area', 'Ultrasound', 'Pharmacy'],
      note: 'Friday clinic for patients across the Chattogram division.'
    }
  ],

  services: [
    {
      slug: 'pregnancy-care', title: 'Pregnancy Care & Antenatal Clinic', icon: 'heart', art: 'pregnancy',
      short: 'Planned check-ups, scans and nutrition guidance from the first heartbeat to delivery.',
      fee: 'From ৳1,500', feeFrom: 1500, duration: '30 min per visit',
      overview: 'Regular, well-timed antenatal care catches problems early and keeps mother and baby safe. High-risk pregnancies receive closer monitoring and a clear plan.',
      includes: ['Dating, anomaly and growth scan guidance', 'Blood, sugar and thyroid screening', 'Nutrition, vitamins and exercise advice', 'Close monitoring of high-risk pregnancy'],
      suitableFor: ['Planning or newly pregnant', 'Diabetes, thyroid or high blood pressure', 'Twins or previous pregnancy loss'],
      process: [
        { t: 'Booking visit', d: 'History, examination and your personal care schedule.' },
        { t: 'Regular reviews', d: 'Timed tests and scans with results explained.' },
        { t: 'Birth planning', d: 'Delivery options and warning signs discussed early.' }
      ]
    },
    {
      slug: 'safe-delivery', title: 'Normal Delivery & Caesarean Section', icon: 'shield', art: 'delivery',
      short: 'Supported normal birth and safe caesarean care with a full obstetric team.',
      fee: 'From ৳45,000', feeFrom: 45000, duration: 'Package, 2–4 day stay',
      overview: 'Whether the birth is planned or urgent, delivery is managed with continuous monitoring, a clear birth plan and attentive aftercare for both mother and baby.',
      includes: ['Normal delivery with pain-relief options', 'Planned and emergency caesarean section', 'Newborn assessment and feeding support', 'Postnatal review at one and six weeks'],
      suitableFor: ['Term pregnancy at 37+ weeks', 'Previous caesarean (VBAC counseling)', 'Twin or high-risk pregnancy'],
      process: [
        { t: 'Birth plan', d: 'Preferences and risks reviewed around week 32.' },
        { t: 'Delivery', d: 'Dr. Rukhsana leads the team throughout labor.' },
        { t: 'Recovery', d: 'Hospital stay, newborn checks and a follow-up visit.' }
      ]
    },
    {
      slug: 'infertility-care', title: 'Infertility & IVF Guidance', icon: 'sparkles', art: 'fertility',
      short: 'Step-by-step evaluation and treatment planning for couples trying to conceive.',
      fee: 'From ৳2,500', feeFrom: 2500, duration: '45 min couple visit',
      overview: 'Infertility has many causes, in women, in men or both. A structured evaluation of both partners leads to the simplest effective treatment first.',
      includes: ['Couple evaluation and test planning', 'Ovulation tracking and induction', 'IUI and IVF counseling and referral', 'Recurrent miscarriage assessment'],
      suitableFor: ['12 months of trying without success', 'Women over 35 trying for 6 months', 'Irregular periods or known PCOS'],
      process: [
        { t: 'Joint consultation', d: 'History and tests for both partners.' },
        { t: 'Diagnosis', d: 'Clear causes, options and realistic chances.' },
        { t: 'Treatment', d: 'Stepwise care from medicines to assisted conception.' }
      ]
    },
    {
      slug: 'pcos-menstrual-health', title: 'PCOS, Periods & Hormonal Health', icon: 'droplet', art: 'pcos',
      short: 'Diagnosis and long-term management of irregular, heavy or painful periods and PCOS.',
      fee: 'From ৳1,500', feeFrom: 1500, duration: '40 min first visit',
      overview: 'Irregular cycles, heavy bleeding, acne or unwanted hair often share a hormonal cause. Targeted tests and a realistic plan restore balance.',
      includes: ['Hormone and thyroid evaluation', 'Pelvic ultrasound', 'Diet, activity and weight programme', 'Medicines for cycle control and symptoms'],
      suitableFor: ['Irregular or missed periods', 'Very heavy or painful periods', 'Acne, hair growth or weight gain'],
      process: [
        { t: 'Assessment', d: 'Symptoms, blood tests and ultrasound together.' },
        { t: 'Personal plan', d: 'Lifestyle and medicines matched to your goals.' },
        { t: 'Review', d: 'Progress checks every 6 to 8 weeks.' }
      ]
    },
    {
      slug: 'laparoscopic-surgery', title: 'Laparoscopic & Hysteroscopic Surgery', icon: 'scissors', art: 'surgery',
      short: 'Keyhole surgery for fibroids, cysts and endometriosis with faster recovery.',
      fee: 'From ৳65,000', feeFrom: 65000, duration: '1–2 day stay',
      overview: 'Minimally invasive surgery means smaller wounds, less pain and an earlier return to normal life, performed by a fellowship-trained laparoscopic surgeon.',
      includes: ['Fibroid and ovarian cyst removal', 'Endometriosis surgery', 'Laparoscopic hysterectomy', 'Hysteroscopy for polyps and adhesions'],
      suitableFor: ['Fibroids or ovarian cysts', 'Chronic pelvic pain', 'Heavy bleeding not controlled by medicine'],
      process: [
        { t: 'Pre-surgery review', d: 'Scans, fitness checks and a clear surgical plan.' },
        { t: 'Surgery', d: 'Keyhole procedure under anesthesia, usually 45 to 90 minutes.' },
        { t: 'Recovery', d: 'Walking the same day and a review after one week.' }
      ]
    },
    {
      slug: 'screening-menopause', title: 'Cancer Screening & Menopause Care', icon: 'sun', art: 'wellness',
      short: 'Pap smear, HPV testing, breast checks and menopause support in one visit.',
      fee: 'From ৳1,200', feeFrom: 1200, duration: '30 min',
      overview: 'Regular screening finds cervical and breast changes early, when they are easiest to treat. Menopause care focuses on comfort, bone health and heart health.',
      includes: ['Pap smear and HPV testing', 'Clinical breast examination', 'Contraception counseling', 'Menopause and bone-health plan'],
      suitableFor: ['Women over 25 for routine screening', 'Hot flushes, poor sleep or mood changes', 'Family history of breast or cervical cancer'],
      process: [
        { t: 'Consultation', d: 'Private discussion of concerns and risk factors.' },
        { t: 'Screening', d: 'Gentle examination and required tests.' },
        { t: 'Care plan', d: 'Results explained with a yearly check-up schedule.' }
      ]
    }
  ],

  posts: [
    {
      slug: 'antenatal-tests-explained', title: 'Antenatal Tests Explained: What Each Scan and Blood Test Checks',
      category: 'Pregnancy', date: '2026-10-28', readMin: 6, art: 'pregnancy', featured: true,
      excerpt: 'A simple trimester-by-trimester guide to the scans and tests you will be advised.',
      body: [
        'An early dating scan, usually between 8 and 12 weeks, confirms the heartbeat and due date. A detailed anomaly scan at 18 to 22 weeks checks your baby\'s organs and growth, and a later scan reviews growth and position.',
        'Routine blood tests check hemoglobin, blood group and Rh factor, blood sugar, thyroid function and common infections. A sugar tolerance test is usually done at 24 to 28 weeks to detect gestational diabetes.',
        'Bring all reports to every visit and ask what each result means. Tests are only useful when they are explained and acted on in time.'
      ],
      takeaways: ['Dating scan at 8 to 12 weeks, anomaly scan at 18 to 22 weeks', 'Sugar test at 24 to 28 weeks catches gestational diabetes', 'Keep every report together and bring it to each visit']
    },
    {
      slug: 'irregular-periods-when-to-see-a-doctor', title: 'Irregular Periods: When to Wait and When to See a Doctor',
      category: 'Periods', date: '2026-10-14', readMin: 5, art: 'pcos',
      excerpt: 'What a normal cycle looks like, and the warning signs that need a check-up.',
      body: [
        'A normal cycle lasts 21 to 35 days, and cycles can vary by a few days from month to month. Occasional changes during stress, travel or weight change are common and usually settle.',
        'See a doctor if periods are missed for three months, cycles are shorter than 21 or longer than 35 days, bleeding is very heavy, or you have severe pain or bleeding between periods.',
        'Common causes include PCOS, thyroid problems and hormonal change near menopause. A short examination, blood tests and an ultrasound usually find the reason, and most causes are very treatable.'
      ],
      takeaways: ['A normal cycle is 21 to 35 days', 'Three missed periods always deserve a check-up', 'Most causes are treatable once identified']
    },
    {
      slug: 'planning-a-caesarean-questions-to-ask', title: 'Planning a Caesarean? Questions to Ask Before the Day',
      category: 'Delivery', date: '2026-09-30', readMin: 5, art: 'delivery',
      excerpt: 'Seven questions that make a planned caesarean calmer and safer for you and your baby.',
      body: [
        'A caesarean is recommended when a normal birth carries more risk, for example with placenta previa, a breech baby, fetal distress or certain earlier surgeries. Ask your doctor exactly why it is advised in your case.',
        'Ask about the type of anesthesia, how long the hospital stay will be, and how soon you can hold and feed your baby. Most mothers stay three to four days and walk within a day.',
        'Recovery takes about six weeks. Plan help at home, avoid heavy lifting, and ask whether a normal birth could be possible in a future pregnancy.'
      ],
      takeaways: ['Ask why a caesarean is advised for you', 'Skin-to-skin contact and early feeding are usually possible', 'Plan six weeks of recovery help at home']
    },
    {
      slug: 'understanding-infertility-causes', title: 'Understanding Infertility: Causes in Women and Men',
      category: 'Fertility', date: '2026-09-16', readMin: 6, art: 'fertility',
      excerpt: 'Why testing both partners early saves time, money and worry.',
      body: [
        'Infertility means not conceiving after 12 months of regular unprotected intercourse, or after six months if the woman is over 35. About a third of cases are due to the woman, a third to the man, and the rest to both or to no clear cause.',
        'In women, common causes are irregular ovulation, blocked tubes, endometriosis and fibroids. In men, low sperm count or poor sperm movement is the most common issue, and a simple semen test gives the answer.',
        'Many couples conceive with lifestyle changes or ovulation medicines. IUI and IVF are considered only when simpler steps have not worked.'
      ],
      takeaways: ['Test both partners together from the start', 'Simple treatments work for many couples', 'See a specialist after 12 months, or 6 months over age 35']
    },
    {
      slug: 'fibroids-and-ovarian-cysts-surgery', title: 'Fibroids and Ovarian Cysts: Do You Always Need Surgery?',
      category: 'Surgery', date: '2026-08-26', readMin: 5, art: 'surgery',
      excerpt: 'Many are harmless. Here is how to know when watching is enough and when to operate.',
      body: [
        'Fibroids are non-cancerous growths of the uterus and are very common. Many are small, cause no symptoms, and only need an ultrasound check every six to twelve months.',
        'Treatment is advised for heavy bleeding, pelvic pressure, rapid growth, pain, or when a fibroid affects fertility. Ovarian cysts often disappear within two to three cycles, but large, painful or persistent cysts need further assessment.',
        'When surgery is needed, keyhole techniques remove fibroids or cysts through tiny cuts, with less pain, shorter stays and quicker recovery than open surgery.'
      ],
      takeaways: ['Small, silent fibroids usually need only monitoring', 'Heavy bleeding, pressure or pain are reasons to treat', 'Keyhole surgery means a faster recovery']
    },
    {
      slug: 'pap-smear-and-hpv-test', title: 'Pap Smear and HPV Test: Why Every Woman Over 25 Should Know',
      category: 'Screening', date: '2026-08-12', readMin: 4, art: 'wellness',
      excerpt: 'A 15-minute test can prevent cervical cancer. Learn who needs it and how often.',
      body: [
        'Cervical cancer is among the most common cancers in women in Bangladesh, yet it develops slowly and is highly preventable. Screening finds abnormal cells years before cancer forms.',
        'A Pap smear and an HPV test take only a few minutes and cause little discomfort. Women are generally advised to start screening from around 25, and to repeat it every three to five years depending on the test used.',
        'HPV vaccination protects best before the first exposure, so ask about it for girls and young women. Vaccinated women still need regular screening.'
      ],
      takeaways: ['Start screening from around age 25', 'The test takes minutes and prevents cancer', 'Vaccination and screening work best together']
    }
  ],

  testimonials: [
    { name: 'Rehana Parvin', area: 'Mirpur, Dhaka', service: 'Pregnancy Care', rating: 5, initials: 'RP', text: 'Every scan and report was explained patiently. I felt safe through my whole pregnancy and delivered a healthy baby girl.' },
    { name: 'Maliha Chowdhury', area: 'Banani, Dhaka', service: 'PCOS Care', rating: 5, initials: 'MC', text: 'Years of irregular periods finally made sense. Her plan was simple, and my cycle is regular within six months.' },
    { name: 'Tahmina Akter', area: 'GEC Circle, Chattogram', service: 'Infertility Care', rating: 5, initials: 'TA', text: 'She tested both of us from day one and never gave false promises. We conceived after a simple treatment course.' },
    { name: 'Sultana Razia', area: 'Gulshan, Dhaka', service: 'Laparoscopic Surgery', rating: 5, initials: 'SR', text: 'My cyst was removed by keyhole surgery. I went home the next day and was back at work within ten days.' },
    { name: 'Nasrin Sultana', area: 'Uttara, Dhaka', service: 'Safe Delivery', rating: 5, initials: 'NS', text: 'Dr. Rukhsana stayed with me through a long labor and made the call for a caesarean at exactly the right moment.' },
    { name: 'Jannatul Ferdous', area: 'Agrabad, Chattogram', service: 'Screening', rating: 5, initials: 'JF', text: 'My first Pap smear was quick and painless. She explained my results clearly and set a reminder for the next test.' },
    { name: 'Shamima Begum', area: 'Pallabi, Dhaka', service: 'Menopause Care', rating: 5, initials: 'SB', text: 'My sleep and energy improved within weeks. She listened to everything and never rushed me.' },
    { name: 'Farhana Islam', area: 'Dhanmondi, Dhaka', service: 'Pregnancy Care', rating: 4, initials: 'FI', text: 'She caught my gestational diabetes early. The diet chart was practical and the follow-ups were always on time.' },
    { name: 'Lubna Yasmin', area: 'Khulshi, Chattogram', service: 'PCOS Care', rating: 5, initials: 'LY', text: 'Honest, kind and well organised. Her advice on diet and exercise was realistic and it truly worked.' }
  ],

  faqs: [
    { cat: 'Appointments', q: 'How can I book an appointment?', a: 'Book online through the appointment page, call +880 1819-336472 or message on WhatsApp. You will receive an SMS confirmation within two hours.' },
    { cat: 'Appointments', q: 'What should I bring to my first visit?', a: 'Bring previous prescriptions, test reports and ultrasound scans, and note the first day of your last period.' },
    { cat: 'Appointments', q: 'Can I change or cancel my appointment?', a: 'Yes. Please inform us at least 12 hours ahead so the slot can be offered to another patient.' },
    { cat: 'Appointments', q: 'Are walk-in patients seen?', a: 'Walk-ins are seen after booked patients, so waiting can be long. Booking ahead is strongly recommended.' },
    { cat: 'Appointments', q: 'Is online consultation available?', a: 'Existing patients can request video follow-ups. First visits are in person so that a proper examination can be done.' },
    { cat: 'Pregnancy', q: 'When should my first antenatal visit be?', a: 'As soon as the pregnancy test is positive, ideally by 8 to 10 weeks, so tests and vitamins can start early.' },
    { cat: 'Pregnancy', q: 'How often are antenatal visits needed?', a: 'Monthly until week 28, every two weeks until week 36 and weekly after that, unless your doctor advises a different schedule.' },
    { cat: 'Pregnancy', q: 'Is travel safe during pregnancy?', a: 'Travel is generally safe in the second trimester. Discuss long journeys with your doctor, especially after week 34 or with any complication.' },
    { cat: 'Treatments', q: 'Is laparoscopic surgery safe?', a: 'Yes. It is a well-established technique with smaller wounds, less pain and quicker recovery. Your suitability is checked before surgery.' },
    { cat: 'Treatments', q: 'Does every PCOS patient need medicines?', a: 'No. Many women improve with diet and exercise alone. Medicines are added only when tests and symptoms require them.' },
    { cat: 'Payments', q: 'What are the consultation fees?', a: 'New patients pay ৳1,200 to ৳1,800 depending on the chamber. Follow-up visits within 30 days are ৳600 to ৳1,000.' },
    { cat: 'Payments', q: 'Which payment methods are accepted?', a: 'Cash, bKash, Nagad and major debit or credit cards are accepted at the hospital counters.' }
  ]
};
