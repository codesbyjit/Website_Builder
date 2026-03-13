import axios from 'axios';

interface DeployResult {
  success: boolean;
  url?: string;
  error?: string;
}

function generateRealEstateHTML(details: Record<string, string>): string {
  const {
    companyName = 'Sarah Mitchell',
    tagline = 'Your Trusted Real Estate Partner',
    brokerageName = 'RealtyGinie',
    teamName = '',
    licenseNumber = '',
    email = 'sarah@realestate.com',
    phone = '(604) 555-0192',
    city = 'Vancouver',
    province = 'BC',
    heroTitle = 'Find Your Home. Move with Confidence.',
    heroSubtitle = 'Part of BC\'s #1-ranked team. Every buyer and seller gets the speed, strategy, and personal attention that gets results.',
    services = 'Home Buying\nHome Selling\nInvestment Properties\nFirst-Time Buyers',
    about = 'With a passion for real estate and a deep understanding of the local market, I\'m dedicated to making your home buying or selling experience exceptional. I bring the resources and expertise of a leading team combined with the personalized attention you deserve.',
    primaryColor = '#C9A96E',
    accentDark = '#0a0a0f',
    homesSOLD = '80+',
    yearsExp = '10+',
    rating = '5.0',
    teamRank = '#1',
    neighborhood1 = 'West Side',
    neighborhood2 = 'East Side',
    neighborhood3 = 'Burnaby',
    neighborhood4 = 'Surrey',
    neighborhood5 = 'Richmond',
    neighborhood6 = 'New Westminster',
    price1 = '$2,100,000',
    price2 = '$1,400,000',
    price3 = '$1,200,000',
    price4 = '$950,000',
    price5 = '$1,300,000',
    price6 = '$850,000',
    review1Name = 'Nirmala P.',
    review1Text = 'She patiently visited multiple homes with us, taking the time to clearly explain the pros and cons of each option. She never rushed us and always put our needs first.',
    review1Type = 'House',
    review2Name = 'Ashwani J.',
    review2Text = 'Finding the right property can be overwhelming, but she made the entire process smooth and stress-free. Incredibly knowledgeable, responsive, and always had our best interests at heart.',
    review2Type = 'Condo',
    review3Name = 'Anna C.',
    review3Text = 'She was professional, knowledgeable, and always available to answer our questions. Made the whole process smooth and stress-free. We would highly recommend her to anyone.',
    review3Type = 'House',
    instagramHandle = '',
    googleReviewsUrl = '#',
    agentPhotoUrl = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80&auto=format',
    heroPhotoUrl = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&q=80&auto=format',
  } = details;

  const provinceName: Record<string, string> = {
    ON: 'Ontario', BC: 'British Columbia', AB: 'Alberta', QC: 'Quebec',
    MB: 'Manitoba', SK: 'Saskatchewan', NS: 'Nova Scotia', NB: 'New Brunswick',
    NL: 'Newfoundland', PE: 'Prince Edward Island', NT: 'Northwest Territories',
    YT: 'Yukon', NU: 'Nunavut',
  };
  const provFull = provinceName[province] || province;
  const servicesList = services.split('\n').filter(s => s.trim());

  const propertyImages = [
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600&q=80&auto=format',
    'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=600&q=80&auto=format',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80&auto=format',
  ];

  const igImages = [
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&q=80&auto=format',
    'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=400&q=80&auto=format',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=80&auto=format',
    'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&q=80&auto=format',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&q=80&auto=format',
    'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=400&q=80&auto=format',
  ];

  const neighborhoods = [
    { name: neighborhood1, price: price1 },
    { name: neighborhood2, price: price2 },
    { name: neighborhood3, price: price3 },
    { name: neighborhood4, price: price4 },
    { name: neighborhood5, price: price5 },
    { name: neighborhood6, price: price6 },
  ];

  const reviews = [
    { name: review1Name, text: review1Text, type: review1Type },
    { name: review2Name, text: review2Text, type: review2Type },
    { name: review3Name, text: review3Text, type: review3Type },
  ];

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${companyName} | ${city} Realtor — ${brokerageName}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

    :root {
      --gold: ${primaryColor};
      --gold-light: ${primaryColor}33;
      --gold-mid: ${primaryColor}88;
      --dark: ${accentDark};
      --dark-2: #13131a;
      --dark-3: #1c1c26;
      --white: #ffffff;
      --off-white: #faf9f7;
      --gray-100: #f4f3f0;
      --gray-200: #e8e6e1;
      --gray-400: #9d9b95;
      --gray-500: #6b6963;
      --gray-700: #3a3935;
      --gray-900: #1a1917;
    }

    html { scroll-behavior: smooth; }
    body { font-family: 'DM Sans', sans-serif; color: var(--gray-700); background: var(--white); line-height: 1.65; overflow-x: hidden; }
    a { text-decoration: none; color: inherit; }
    img { max-width: 100%; display: block; }
    .container { max-width: 1200px; margin: 0 auto; padding: 0 28px; }

    /* ─── HEADER ─── */
    header {
      position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
      background: rgba(255,255,255,0.95);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border-bottom: 1px solid var(--gray-200);
      transition: all 0.3s ease;
    }
    .header-inner {
      display: flex; align-items: center; justify-content: space-between;
      padding: 16px 0; gap: 24px;
    }
    .logo-wrap { display: flex; flex-direction: column; }
    .logo-name {
      font-family: 'Playfair Display', serif;
      font-size: 20px; font-weight: 700;
      color: var(--gray-900); letter-spacing: -0.3px; line-height: 1;
    }
    .logo-sub { font-size: 11px; font-weight: 400; color: var(--gold); letter-spacing: 1.5px; text-transform: uppercase; margin-top: 3px; }
    nav { display: flex; align-items: center; gap: 28px; }
    nav a { font-size: 14px; font-weight: 500; color: var(--gray-500); transition: color 0.2s; letter-spacing: 0.2px; }
    nav a:hover { color: var(--gray-900); }
    .header-right { display: flex; align-items: center; gap: 16px; flex-shrink: 0; }
    .header-phone { font-size: 14px; font-weight: 500; color: var(--gray-700); }
    .btn-talk {
      background: var(--dark); color: var(--white);
      padding: 10px 22px; border-radius: 6px;
      font-size: 13px; font-weight: 600; letter-spacing: 0.3px;
      transition: all 0.25s; white-space: nowrap;
    }
    .btn-talk:hover { background: var(--gold); color: var(--dark); }

    /* ─── HERO ─── */
    .hero {
      position: relative; min-height: 100vh;
      display: flex; align-items: center;
      background: var(--dark); overflow: hidden; padding-top: 80px;
    }
    .hero-bg {
      position: absolute; inset: 0;
      background-image: url('${heroPhotoUrl}');
      background-size: cover; background-position: center;
      opacity: 0.18;
    }
    .hero-overlay {
      position: absolute; inset: 0;
      background: linear-gradient(105deg, var(--dark) 45%, transparent 100%);
    }
    .hero-inner {
      position: relative; z-index: 2;
      display: grid; grid-template-columns: 1fr 420px;
      gap: 60px; align-items: center; padding: 80px 0 60px;
    }
    .hero-badge {
      display: inline-flex; align-items: center; gap: 8px;
      background: var(--gold-light); border: 1px solid var(--gold-mid);
      color: var(--gold); padding: 7px 16px; border-radius: 50px;
      font-size: 12px; font-weight: 600; letter-spacing: 1.2px;
      text-transform: uppercase; margin-bottom: 28px;
    }
    .hero-badge::before { content: ''; width: 6px; height: 6px; background: var(--gold); border-radius: 50%; animation: pulse 2s infinite; }
    @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.6;transform:scale(0.85)} }
    .hero h1 {
      font-family: 'Playfair Display', serif;
      font-size: clamp(38px, 4.5vw, 60px); font-weight: 700;
      color: var(--white); line-height: 1.12; letter-spacing: -1px;
      margin-bottom: 22px;
    }
    .hero h1 em { font-style: italic; color: var(--gold); }
    .hero-desc { font-size: 17px; color: rgba(255,255,255,0.65); max-width: 520px; margin-bottom: 40px; line-height: 1.7; }
    .hero-actions { display: flex; gap: 14px; flex-wrap: wrap; margin-bottom: 56px; }
    .btn-primary-hero {
      background: var(--gold); color: var(--dark);
      padding: 16px 32px; border-radius: 7px;
      font-size: 15px; font-weight: 600; letter-spacing: 0.2px;
      transition: all 0.25s; display: inline-flex; align-items: center; gap: 8px;
    }
    .btn-primary-hero:hover { background: var(--white); transform: translateY(-2px); box-shadow: 0 12px 28px rgba(0,0,0,0.3); }
    .btn-outline-hero {
      background: transparent; color: var(--white);
      border: 1.5px solid rgba(255,255,255,0.3);
      padding: 16px 32px; border-radius: 7px;
      font-size: 15px; font-weight: 500;
      transition: all 0.25s; display: inline-flex; align-items: center; gap: 8px;
    }
    .btn-outline-hero:hover { border-color: var(--white); background: rgba(255,255,255,0.07); }
    .hero-stats { display: flex; gap: 36px; }
    .hero-stat-item { }
    .hero-stat-num { font-family: 'Playfair Display', serif; font-size: 36px; font-weight: 700; color: var(--white); line-height: 1; }
    .hero-stat-label { font-size: 12px; font-weight: 500; color: rgba(255,255,255,0.45); letter-spacing: 0.8px; text-transform: uppercase; margin-top: 4px; }

    /* Hero Agent Card */
    .hero-agent-card {
      position: relative;
      background: var(--dark-3); border: 1px solid rgba(255,255,255,0.1);
      border-radius: 20px; overflow: hidden;
    }
    .hero-agent-photo { width: 100%; height: 500px; object-fit: cover; object-position: top center; }
    .hero-agent-info {
      position: absolute; bottom: 0; left: 0; right: 0;
      background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%);
      padding: 40px 28px 28px;
    }
    .hero-agent-badge {
      display: inline-block; background: var(--gold); color: var(--dark);
      font-size: 10px; font-weight: 700; letter-spacing: 1.5px;
      text-transform: uppercase; padding: 5px 12px; border-radius: 4px; margin-bottom: 12px;
    }
    .hero-agent-name {
      font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700;
      color: var(--white); display: block; line-height: 1.2;
    }
    .hero-agent-brokerage { font-size: 13px; color: rgba(255,255,255,0.55); margin-top: 4px; }
    .hero-stars { display: flex; gap: 3px; margin-top: 10px; }
    .hero-stars span { color: var(--gold); font-size: 14px; }

    /* ─── STATS BANNER ─── */
    .stats-banner { background: var(--dark-2); padding: 52px 0; border-top: 1px solid rgba(255,255,255,0.06); }
    .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; }
    .stat-item {
      text-align: center; padding: 12px 24px;
      border-right: 1px solid rgba(255,255,255,0.08);
    }
    .stat-item:last-child { border-right: none; }
    .stat-num { font-family: 'Playfair Display', serif; font-size: 48px; font-weight: 700; color: var(--white); line-height: 1; }
    .stat-num .counter { display: inline-block; }
    .stat-label { font-size: 12px; font-weight: 500; color: rgba(255,255,255,0.4); letter-spacing: 1.2px; text-transform: uppercase; margin-top: 8px; }

    /* ─── SECTION COMMON ─── */
    .section-eyebrow {
      font-size: 11px; font-weight: 600; letter-spacing: 2.5px;
      text-transform: uppercase; color: var(--gold); margin-bottom: 14px;
      display: flex; align-items: center; gap: 10px;
    }
    .section-eyebrow::after { content: ''; flex: 1; height: 1px; background: var(--gold-mid); max-width: 40px; }
    .section-title {
      font-family: 'Playfair Display', serif;
      font-size: clamp(30px, 3.5vw, 44px); font-weight: 700;
      color: var(--gray-900); line-height: 1.15; letter-spacing: -0.5px;
    }
    .section-title em { font-style: italic; color: var(--gold); }

    /* ─── FEATURED PROPERTIES ─── */
    .properties { padding: 100px 0; background: var(--off-white); }
    .section-head { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 52px; }
    .view-all-link {
      font-size: 14px; font-weight: 600; color: var(--gold);
      border-bottom: 1px solid var(--gold); padding-bottom: 2px;
      transition: opacity 0.2s;
    }
    .view-all-link:hover { opacity: 0.7; }
    .prop-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; }
    .prop-card {
      background: var(--white); border-radius: 14px; overflow: hidden;
      box-shadow: 0 2px 8px rgba(0,0,0,0.06); transition: all 0.3s;
    }
    .prop-card:hover { transform: translateY(-6px); box-shadow: 0 20px 40px rgba(0,0,0,0.12); }
    .prop-img-wrap { position: relative; height: 230px; overflow: hidden; }
    .prop-img-wrap img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
    .prop-card:hover .prop-img-wrap img { transform: scale(1.05); }
    .prop-tag {
      position: absolute; top: 16px; left: 16px;
      background: var(--gold); color: var(--dark);
      font-size: 11px; font-weight: 700; letter-spacing: 0.8px;
      text-transform: uppercase; padding: 5px 12px; border-radius: 4px;
    }
    .prop-body { padding: 24px; }
    .prop-price {
      font-family: 'Playfair Display', serif;
      font-size: 24px; font-weight: 700; color: var(--gray-900); margin-bottom: 6px;
    }
    .prop-address { font-size: 14px; color: var(--gray-500); margin-bottom: 16px; }
    .prop-specs { display: flex; gap: 18px; font-size: 13px; color: var(--gray-500); padding-top: 16px; border-top: 1px solid var(--gray-200); }
    .prop-spec { display: flex; align-items: center; gap: 5px; }
    .prop-spec svg { color: var(--gold); }

    /* ─── ABOUT ─── */
    .about { padding: 100px 0; }
    .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
    .about-photo-wrap { position: relative; }
    .about-photo {
      width: 100%; height: 580px; object-fit: cover;
      border-radius: 16px; object-position: top center;
    }
    .about-photo-badge {
      position: absolute; bottom: -20px; right: -20px;
      background: var(--dark); color: var(--white);
      border-radius: 14px; padding: 24px 28px;
      border: 2px solid rgba(255,255,255,0.08);
      box-shadow: 0 20px 40px rgba(0,0,0,0.2);
    }
    .about-badge-num { font-family: 'Playfair Display', serif; font-size: 40px; font-weight: 700; color: var(--gold); line-height: 1; }
    .about-badge-label { font-size: 13px; color: rgba(255,255,255,0.55); margin-top: 4px; }
    .about-content { padding-bottom: 20px; }
    .about-content .section-title { margin-bottom: 10px; }
    .about-brokerage { font-size: 14px; color: var(--gold); font-weight: 500; letter-spacing: 0.5px; margin-bottom: 24px; }
    .about-text { font-size: 16px; color: var(--gray-500); line-height: 1.8; margin-bottom: 24px; }
    .about-chips { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 36px; }
    .about-chip {
      background: var(--gray-100); border: 1px solid var(--gray-200);
      border-radius: 50px; padding: 8px 18px;
      font-size: 13px; font-weight: 500; color: var(--gray-700);
    }
    .btn-dark {
      display: inline-flex; align-items: center; gap: 9px;
      background: var(--dark); color: var(--white);
      padding: 16px 30px; border-radius: 8px;
      font-size: 15px; font-weight: 600; transition: all 0.25s;
    }
    .btn-dark:hover { background: var(--gold); color: var(--dark); }

    /* ─── WHAT SETS ME APART ─── */
    .apart { padding: 100px 0; background: var(--gray-100); }
    .apart-header { text-align: center; max-width: 580px; margin: 0 auto 60px; }
    .apart-header .section-eyebrow { justify-content: center; }
    .apart-header .section-eyebrow::after { display: none; }
    .apart-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
    .apart-card {
      background: var(--white); border-radius: 14px; padding: 36px 28px;
      border: 1px solid var(--gray-200);
      transition: all 0.3s;
    }
    .apart-card:hover { border-color: var(--gold); transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.08); }
    .apart-icon {
      width: 52px; height: 52px; border-radius: 12px;
      background: var(--dark); display: flex; align-items: center; justify-content: center;
      margin-bottom: 22px;
    }
    .apart-icon svg { color: var(--gold); }
    .apart-card h3 { font-size: 17px; font-weight: 600; color: var(--gray-900); margin-bottom: 10px; }
    .apart-card p { font-size: 14px; color: var(--gray-400); line-height: 1.7; }

    /* ─── HOW I WORK ─── */
    .process { padding: 100px 0; }
    .process-header { text-align: center; max-width: 600px; margin: 0 auto 64px; }
    .process-header .section-eyebrow { justify-content: center; }
    .process-header .section-eyebrow::after { display: none; }
    .process-steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px; position: relative; }
    .process-steps::before {
      content: '';
      position: absolute; top: 36px; left: calc(16.66% + 20px); right: calc(16.66% + 20px);
      height: 1px; background: var(--gray-200);
    }
    .process-step { text-align: center; }
    .step-num {
      width: 72px; height: 72px; border-radius: 50%;
      background: var(--dark); color: var(--white);
      font-family: 'Playfair Display', serif; font-size: 24px; font-weight: 700;
      display: flex; align-items: center; justify-content: center;
      margin: 0 auto 28px; position: relative; z-index: 1;
      border: 3px solid transparent;
      transition: all 0.3s;
    }
    .process-step:hover .step-num { background: var(--gold); color: var(--dark); border-color: var(--gold); }
    .process-step h3 { font-size: 18px; font-weight: 600; color: var(--gray-900); margin-bottom: 10px; }
    .process-step p { font-size: 15px; color: var(--gray-400); line-height: 1.7; }

    /* ─── REVIEWS ─── */
    .reviews { padding: 100px 0; background: var(--dark); }
    .reviews-header { text-align: center; max-width: 600px; margin: 0 auto 20px; }
    .reviews .section-eyebrow { color: var(--gold); justify-content: center; }
    .reviews .section-eyebrow::after { display: none; }
    .reviews .section-title { color: var(--white); }
    .reviews-rating { display: flex; justify-content: center; align-items: center; gap: 10px; margin: 16px 0 56px; }
    .reviews-stars { display: flex; gap: 4px; }
    .reviews-stars span { color: var(--gold); font-size: 20px; }
    .reviews-rating-text { font-size: 15px; color: rgba(255,255,255,0.5); }
    .reviews-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
    .review-card {
      background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
      border-radius: 16px; padding: 32px;
      transition: all 0.3s;
    }
    .review-card:hover { border-color: var(--gold-mid); background: rgba(255,255,255,0.07); }
    .review-quote { color: var(--gold); font-size: 40px; font-family: 'Playfair Display', serif; line-height: 1; margin-bottom: 16px; }
    .review-text { font-size: 15px; color: rgba(255,255,255,0.65); line-height: 1.8; margin-bottom: 24px; font-style: italic; }
    .review-author { display: flex; align-items: center; gap: 14px; }
    .review-avatar {
      width: 44px; height: 44px; border-radius: 50%;
      background: var(--gold); display: flex; align-items: center; justify-content: center;
      font-size: 16px; font-weight: 700; color: var(--dark); flex-shrink: 0;
    }
    .review-name { font-size: 15px; font-weight: 600; color: var(--white); }
    .review-type { font-size: 13px; color: rgba(255,255,255,0.4); margin-top: 2px; }
    .reviews-cta { text-align: center; margin-top: 52px; display: flex; gap: 14px; justify-content: center; }

    /* ─── NEIGHBORHOODS ─── */
    .neighborhoods { padding: 100px 0; background: var(--off-white); }
    .neighborhoods-header { text-align: center; max-width: 600px; margin: 0 auto 56px; }
    .neighborhoods-header .section-eyebrow { justify-content: center; }
    .neighborhoods-header .section-eyebrow::after { display: none; }
    .neighborhoods-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
    .neighborhood-card {
      position: relative; height: 200px; border-radius: 14px; overflow: hidden;
      cursor: pointer; transition: all 0.35s;
    }
    .neighborhood-card:hover { transform: scale(1.02); }
    .neighborhood-card:nth-child(1) { background: linear-gradient(135deg, #1a1a2e, #16213e); }
    .neighborhood-card:nth-child(2) { background: linear-gradient(135deg, #1a2a1a, #2d4a2d); }
    .neighborhood-card:nth-child(3) { background: linear-gradient(135deg, #2e1a1a, #4a2d2d); }
    .neighborhood-card:nth-child(4) { background: linear-gradient(135deg, #1a2a2e, #1a3a3a); }
    .neighborhood-card:nth-child(5) { background: linear-gradient(135deg, #2a1a2e, #3a2d4a); }
    .neighborhood-card:nth-child(6) { background: linear-gradient(135deg, #2e2a1a, #4a3d1a); }
    .neighborhood-overlay {
      position: absolute; inset: 0;
      background: linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 100%);
      display: flex; flex-direction: column; justify-content: flex-end; padding: 24px;
      transition: all 0.3s;
    }
    .neighborhood-card:hover .neighborhood-overlay { background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 100%); }
    .neighborhood-name { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 700; color: var(--white); }
    .neighborhood-price { font-size: 13px; color: var(--gold); margin-top: 4px; font-weight: 500; }
    .neighborhood-explore {
      font-size: 12px; color: rgba(255,255,255,0.6); margin-top: 6px;
      display: flex; align-items: center; gap: 5px;
      transform: translateY(4px); opacity: 0; transition: all 0.3s;
    }
    .neighborhood-card:hover .neighborhood-explore { opacity: 1; transform: translateY(0); }

    /* ─── INSTAGRAM ─── */
    .instagram { padding: 80px 0; background: var(--white); }
    .instagram-header { text-align: center; margin-bottom: 40px; }
    .ig-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 6px; margin-bottom: 32px; }
    .ig-item { position: relative; aspect-ratio: 1; overflow: hidden; cursor: pointer; }
    .ig-item img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease; }
    .ig-item:hover img { transform: scale(1.08); }
    .ig-item-overlay {
      position: absolute; inset: 0; background: rgba(0,0,0,0.4);
      opacity: 0; transition: opacity 0.3s;
      display: flex; align-items: center; justify-content: center;
    }
    .ig-item-overlay svg { color: white; }
    .ig-item:hover .ig-item-overlay { opacity: 1; }
    .instagram-cta { text-align: center; }
    .btn-ig {
      display: inline-flex; align-items: center; gap: 8px;
      border: 1.5px solid var(--gray-200); border-radius: 8px;
      padding: 14px 28px; font-size: 14px; font-weight: 600; color: var(--gray-700);
      transition: all 0.25s;
    }
    .btn-ig:hover { border-color: var(--gold); color: var(--gold); }

    /* ─── LISTING ALERTS ─── */
    .alerts { padding: 80px 0; background: var(--dark-3); }
    .alerts-inner { max-width: 700px; margin: 0 auto; text-align: center; }
    .alerts .section-title { color: var(--white); margin-bottom: 10px; }
    .alerts-sub { font-size: 16px; color: rgba(255,255,255,0.5); margin-bottom: 36px; }
    .alerts-form { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; margin-bottom: 16px; }
    .form-select {
      background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12);
      color: rgba(255,255,255,0.7); padding: 14px 16px; border-radius: 8px;
      font-size: 14px; font-family: inherit; outline: none; cursor: pointer;
      appearance: none; -webkit-appearance: none;
      background-image: url("data:image/svg+xml,%3Csvg width='10' height='6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23C9A96E' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
      background-repeat: no-repeat; background-position: right 14px center;
      transition: border-color 0.2s;
    }
    .form-select:focus { border-color: var(--gold); }
    .form-select option { background: var(--dark-2); color: var(--white); }
    .btn-alert {
      grid-column: 1 / -1; background: var(--gold); color: var(--dark);
      padding: 16px; border-radius: 8px; font-size: 15px; font-weight: 700;
      cursor: pointer; border: none; font-family: inherit;
      transition: all 0.25s; letter-spacing: 0.3px;
    }
    .btn-alert:hover { background: var(--white); }
    .alerts-note { font-size: 12px; color: rgba(255,255,255,0.3); }

    /* ─── FINAL CTA ─── */
    .cta-section {
      padding: 100px 0;
      background: linear-gradient(135deg, var(--dark) 0%, var(--dark-2) 100%);
      text-align: center; position: relative; overflow: hidden;
    }
    .cta-section::before {
      content: ''; position: absolute; inset: 0;
      background: radial-gradient(ellipse at 50% 120%, ${primaryColor}20 0%, transparent 60%);
    }
    .cta-section .section-title { color: var(--white); margin-bottom: 18px; position: relative; }
    .cta-sub { font-size: 17px; color: rgba(255,255,255,0.5); max-width: 540px; margin: 0 auto 44px; position: relative; }
    .cta-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; position: relative; }
    .btn-cta-primary {
      background: var(--gold); color: var(--dark);
      padding: 18px 40px; border-radius: 8px;
      font-size: 15px; font-weight: 700; transition: all 0.25s;
    }
    .btn-cta-primary:hover { background: var(--white); transform: translateY(-2px); }
    .btn-cta-outline {
      background: transparent; color: var(--white);
      border: 1.5px solid rgba(255,255,255,0.25);
      padding: 18px 40px; border-radius: 8px;
      font-size: 15px; font-weight: 500; transition: all 0.25s;
    }
    .btn-cta-outline:hover { border-color: var(--white); background: rgba(255,255,255,0.05); }

    /* ─── FOOTER ─── */
    footer {
      background: var(--dark); border-top: 1px solid rgba(255,255,255,0.06);
      padding: 60px 0 36px;
    }
    .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 48px; margin-bottom: 52px; }
    .footer-brand .logo-name { color: var(--white); font-size: 22px; }
    .footer-brand .logo-sub { color: var(--gold); }
    .footer-brand-desc { font-size: 14px; color: rgba(255,255,255,0.4); line-height: 1.8; margin-top: 16px; max-width: 280px; }
    .footer-col h4 { font-size: 12px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; color: rgba(255,255,255,0.3); margin-bottom: 20px; }
    .footer-col ul { list-style: none; display: flex; flex-direction: column; gap: 10px; }
    .footer-col ul li a { font-size: 14px; color: rgba(255,255,255,0.55); transition: color 0.2s; }
    .footer-col ul li a:hover { color: var(--gold); }
    .footer-contact-item { font-size: 14px; color: rgba(255,255,255,0.55); margin-bottom: 8px; }
    .footer-contact-item a { color: rgba(255,255,255,0.55); transition: color 0.2s; }
    .footer-contact-item a:hover { color: var(--gold); }
    .footer-bottom { border-top: 1px solid rgba(255,255,255,0.06); padding-top: 28px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; }
    .footer-copy { font-size: 13px; color: rgba(255,255,255,0.25); }
    .footer-legal { font-size: 12px; color: rgba(255,255,255,0.2); max-width: 500px; text-align: right; }

    /* ─── RESPONSIVE ─── */
    @media (max-width: 1024px) {
      .hero-inner { grid-template-columns: 1fr; }
      .hero-agent-card { display: none; }
      .about-grid { grid-template-columns: 1fr; gap: 50px; }
      .footer-grid { grid-template-columns: 1fr 1fr; gap: 36px; }
      .apart-grid { grid-template-columns: repeat(2, 1fr); }
    }
    @media (max-width: 768px) {
      nav { display: none; }
      .header-phone { display: none; }
      .prop-grid, .reviews-grid, .neighborhoods-grid, .process-steps { grid-template-columns: 1fr; }
      .stats-grid { grid-template-columns: repeat(2, 1fr); }
      .stat-item { border-bottom: 1px solid rgba(255,255,255,0.08); border-right: none; }
      .stat-item:nth-child(odd) { border-right: 1px solid rgba(255,255,255,0.08); }
      .ig-grid { grid-template-columns: repeat(3, 1fr); }
      .apart-grid { grid-template-columns: 1fr; }
      .alerts-form { grid-template-columns: 1fr; }
      .section-head { flex-direction: column; align-items: flex-start; gap: 16px; }
      .process-steps::before { display: none; }
      .footer-grid { grid-template-columns: 1fr; gap: 32px; }
      .footer-legal { text-align: left; }
    }
    @media (max-width: 480px) {
      .hero-stats { flex-wrap: wrap; gap: 24px; }
      .hero-actions { flex-direction: column; }
      .cta-btns { flex-direction: column; align-items: center; }
      .about-photo-badge { right: 12px; bottom: -12px; }
    }
  </style>
</head>
<body>

  <!-- HEADER -->
  <header>
    <div class="container">
      <div class="header-inner">
        <a href="#" class="logo-wrap">
          <span class="logo-name">${companyName}</span>
          <span class="logo-sub">Real Estate</span>
        </a>
        <nav>
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#reviews">Reviews</a>
          <a href="#neighborhoods">Areas</a>
          <a href="#contact">Contact</a>
        </nav>
        <div class="header-right">
          <a href="tel:${phone}" class="header-phone">${phone}</a>
          <a href="#contact" class="btn-talk">Let's Talk</a>
        </div>
      </div>
    </div>
  </header>

  <!-- HERO -->
  <section class="hero">
    <div class="hero-bg"></div>
    <div class="hero-overlay"></div>
    <div class="container" style="width:100%">
      <div class="hero-inner">
        <div class="hero-content">
          <div class="hero-badge">Greater ${city}'s Trusted Realtor</div>
          <h1>${heroTitle.includes('.') ? heroTitle.split('.').map((p, i) => i === 1 ? `<em>${p}.</em>` : p + (i < heroTitle.split('.').length - 1 ? '.' : '')).join('') : heroTitle}</h1>
          <p class="hero-desc">${heroSubtitle}</p>
          <div class="hero-actions">
            <a href="#services" class="btn-primary-hero">
              <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
              Explore Properties
            </a>
            <a href="#contact" class="btn-outline-hero">Get Your Home's Value</a>
          </div>
          <div class="hero-stats">
            <div class="hero-stat-item">
              <div class="hero-stat-num">${homesSOLD}</div>
              <div class="hero-stat-label">Homes Sold</div>
            </div>
            <div class="hero-stat-item">
              <div class="hero-stat-num">${teamRank}</div>
              <div class="hero-stat-label">Team in ${province}</div>
            </div>
            <div class="hero-stat-item">
              <div class="hero-stat-num">7d</div>
              <div class="hero-stat-label">Available</div>
            </div>
          </div>
        </div>
        <div>
          <div class="hero-agent-card">
            <img class="hero-agent-photo" src="${agentPhotoUrl}" alt="${companyName} — ${city} Realtor" loading="eager">
            <div class="hero-agent-info">
              <span class="hero-agent-badge">${teamRank} Team in ${province}</span>
              <span class="hero-agent-name">${companyName}</span>
              <div class="hero-agent-brokerage">${brokerageName}${teamName ? ' · ' + teamName : ''}</div>
              <div class="hero-stars">
                <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                <span style="color:rgba(255,255,255,0.4);font-size:13px;margin-left:6px;">${rating} Google Reviews</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- STATS BANNER -->
  <section class="stats-banner">
    <div class="container">
      <div class="stats-grid">
        <div class="stat-item">
          <div class="stat-num" data-target="${homesSOLD.replace(/\D/g, '')}" data-suffix="${homesSOLD.replace(/[0-9]/g, '')}"><span class="counter">0</span>${homesSOLD.replace(/[0-9]/g, '')}</div>
          <div class="stat-label">Homes Sold</div>
        </div>
        <div class="stat-item">
          <div class="stat-num">${rating}</div>
          <div class="stat-label">Google Rating</div>
        </div>
        <div class="stat-item">
          <div class="stat-num">${teamRank}</div>
          <div class="stat-label">Team in ${province}</div>
        </div>
        <div class="stat-item">
          <div class="stat-num">98%</div>
          <div class="stat-label">Client Satisfaction</div>
        </div>
      </div>
    </div>
  </section>

  <!-- FEATURED PROPERTIES -->
  <section class="properties" id="services">
    <div class="container">
      <div class="section-head">
        <div>
          <div class="section-eyebrow">Featured Properties</div>
          <h2 class="section-title">Find Your <em>Dream Home</em></h2>
        </div>
        <a href="#" class="view-all-link">View All Properties →</a>
      </div>
      <div class="prop-grid">
        ${[
          { img: propertyImages[0], tag: 'For Sale', price: price1, address: `${neighborhood1}, ${city}`, beds: 4, baths: 3, sqft: '2,450' },
          { img: propertyImages[1], tag: 'New Listing', price: price3, address: `${neighborhood3}, ${city}`, beds: 3, baths: 2, sqft: '1,820' },
          { img: propertyImages[2], tag: 'Featured', price: price5, address: `${neighborhood5}, ${city}`, beds: 5, baths: 4, sqft: '3,100' },
        ].map(p => `
        <div class="prop-card">
          <div class="prop-img-wrap">
            <img src="${p.img}" alt="Property in ${city}" loading="lazy">
            <div class="prop-tag">${p.tag}</div>
          </div>
          <div class="prop-body">
            <div class="prop-price">${p.price}</div>
            <div class="prop-address">${p.address}, ${province}</div>
            <div class="prop-specs">
              <div class="prop-spec">
                <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
                ${p.beds} Beds
              </div>
              <div class="prop-spec">
                <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                ${p.baths} Baths
              </div>
              <div class="prop-spec">
                <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"/></svg>
                ${p.sqft} sqft
              </div>
            </div>
          </div>
        </div>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- ABOUT -->
  <section class="about" id="about">
    <div class="container">
      <div class="about-grid">
        <div class="about-photo-wrap">
          <img class="about-photo" src="${agentPhotoUrl}" alt="${companyName}" loading="lazy">
          <div class="about-photo-badge">
            <div class="about-badge-num">${homesSOLD}</div>
            <div class="about-badge-label">Homes Sold</div>
          </div>
        </div>
        <div class="about-content">
          <div class="section-eyebrow">Meet Your Realtor</div>
          <h2 class="section-title">${companyName}</h2>
          <div class="about-brokerage">${brokerageName}${teamName ? ' | ' + teamName : ''}</div>
          <p class="about-text">${about}</p>
          <div class="about-chips">
            <span class="about-chip">${homesSOLD} Homes Sold</span>
            <span class="about-chip">${rating}-Star Rating</span>
            <span class="about-chip">${teamRank} Team in ${province}</span>
            ${licenseNumber ? `<span class="about-chip">License: ${licenseNumber}</span>` : ''}
          </div>
          <a href="#contact" class="btn-dark">
            Learn More About ${companyName.split(' ')[0]}
            <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
          </a>
        </div>
      </div>
    </div>
  </section>

  <!-- WHAT SETS ME APART -->
  <section class="apart">
    <div class="container">
      <div class="apart-header">
        <div class="section-eyebrow">Get to Know Me</div>
        <h2 class="section-title">See What <em>Sets Me Apart</em></h2>
      </div>
      <div class="apart-grid">
        <div class="apart-card">
          <div class="apart-icon">
            <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          </div>
          <h3>Available 7 Days a Week</h3>
          <p>Anytime, evenings and weekends included. I'm here when you need me most.</p>
        </div>
        <div class="apart-card">
          <div class="apart-icon">
            <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
          </div>
          <h3>Same-Day Communication</h3>
          <p>Questions answered fast, every time. No waiting, no uncertainty.</p>
        </div>
        <div class="apart-card">
          <div class="apart-icon">
            <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
          </div>
          <h3>No-Pressure Guidance</h3>
          <p>Your pace, your decision, always. I guide — never push.</p>
        </div>
        <div class="apart-card">
          <div class="apart-icon">
            <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>
          </div>
          <h3>Expert Negotiator</h3>
          <p>Fighting for the best deal on your behalf, every single time.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- HOW I WORK -->
  <section class="process">
    <div class="container">
      <div class="process-header">
        <div class="section-eyebrow">How I Work With You</div>
        <h2 class="section-title">Three Steps to <em>Your New Home</em></h2>
      </div>
      <div class="process-steps">
        <div class="process-step">
          <div class="step-num">01</div>
          <h3>Free Strategy Call</h3>
          <p>We align on your goals, timeline, and must-haves. No obligation, no pressure.</p>
        </div>
        <div class="process-step">
          <div class="step-num">02</div>
          <h3>Personalized Plan</h3>
          <p>A tailored market strategy built around you — not a one-size-fits-all template.</p>
        </div>
        <div class="process-step">
          <div class="step-num">03</div>
          <h3>Guided to Close</h3>
          <p>Every detail handled: offers, negotiations, and paperwork from start to finish.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- REVIEWS -->
  <section class="reviews" id="reviews">
    <div class="container">
      <div class="reviews-header">
        <div class="section-eyebrow">Google Reviews</div>
        <h2 class="section-title">What Clients Say</h2>
      </div>
      <div class="reviews-rating">
        <div class="reviews-stars"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
        <span class="reviews-rating-text">${rating} based on verified reviews</span>
      </div>
      <div class="reviews-grid">
        ${reviews.map(r => `
        <div class="review-card">
          <div class="review-quote">"</div>
          <p class="review-text">${r.text}</p>
          <div class="review-author">
            <div class="review-avatar">${r.name.charAt(0)}</div>
            <div>
              <div class="review-name">${r.name}</div>
              <div class="review-type">${r.type} · ${city}</div>
            </div>
          </div>
        </div>
        `).join('')}
      </div>
      <div class="reviews-cta">
        <a href="${googleReviewsUrl}" class="btn-cta-primary" target="_blank" rel="noopener">Read All Reviews</a>
        <a href="${googleReviewsUrl}" class="btn-cta-outline" target="_blank" rel="noopener">Review Us on Google</a>
      </div>
    </div>
  </section>

  <!-- NEIGHBORHOODS -->
  <section class="neighborhoods" id="neighborhoods">
    <div class="container">
      <div class="neighborhoods-header">
        <div class="section-eyebrow">Explore the Area</div>
        <h2 class="section-title">Greater ${city} <em>Neighborhoods</em></h2>
        <p style="font-size:16px;color:var(--gray-400);margin-top:14px;">Discover the unique character of each neighborhood and find the community that feels like home.</p>
      </div>
      <div class="neighborhoods-grid">
        ${neighborhoods.map(n => `
        <div class="neighborhood-card">
          <div class="neighborhood-overlay">
            <div class="neighborhood-name">${n.name}</div>
            <div class="neighborhood-price">From ${n.price}</div>
            <div class="neighborhood-explore">
              Explore ${n.name}
              <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            </div>
          </div>
        </div>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- INSTAGRAM -->
  ${instagramHandle ? `
  <section class="instagram">
    <div class="container">
      <div class="instagram-header">
        <div class="section-eyebrow" style="justify-content:center;margin-bottom:8px;">Follow Along</div>
        <h2 class="section-title" style="text-align:center;">On <em>Instagram</em></h2>
        <p style="text-align:center;font-size:15px;color:var(--gray-400);margin-top:10px;">Real listings. Real results. See what's happening in ${city} real estate.</p>
      </div>
      <div class="ig-grid">
        ${igImages.map((img, i) => `
        <a class="ig-item" href="https://instagram.com/${instagramHandle.replace('@','')}" target="_blank" rel="noopener">
          <img src="${img}" alt="Instagram ${i+1}" loading="lazy">
          <div class="ig-item-overlay">
            <svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
          </div>
        </a>
        `).join('')}
      </div>
      <div class="instagram-cta">
        <a href="https://instagram.com/${instagramHandle.replace('@','')}" target="_blank" rel="noopener" class="btn-ig">
          <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
          Follow ${instagramHandle}
        </a>
      </div>
    </div>
  </section>
  ` : ''}

  <!-- LISTING ALERTS -->
  <section class="alerts">
    <div class="container">
      <div class="alerts-inner">
        <div class="section-eyebrow" style="justify-content:center;margin-bottom:12px;">Get New Listing Alerts</div>
        <h2 class="section-title">Be the First to Know</h2>
        <p class="alerts-sub">Properties matching your criteria, delivered straight to your inbox. Unsubscribe anytime.</p>
        <div class="alerts-form">
          <select class="form-select">
            <option value="" disabled selected>Preferred Area</option>
            ${neighborhoods.map(n => `<option>${n.name}</option>`).join('')}
          </select>
          <select class="form-select">
            <option value="" disabled selected>Price Range</option>
            <option>Under $500K</option>
            <option>$500K – $1M</option>
            <option>$1M – $1.5M</option>
            <option>$1.5M – $2M</option>
            <option>$2M+</option>
          </select>
          <select class="form-select">
            <option value="" disabled selected>Property Type</option>
            <option>House</option>
            <option>Condo</option>
            <option>Townhouse</option>
            <option>Duplex</option>
          </select>
          <button class="btn-alert">Start Alerts</button>
        </div>
        <p class="alerts-note">Your information is never shared. Unsubscribe anytime.</p>
      </div>
    </div>
  </section>

  <!-- FINAL CTA -->
  <section class="cta-section" id="contact">
    <div class="container">
      <div class="section-eyebrow" style="justify-content:center;margin-bottom:16px;">Ready to Take the Next Step?</div>
      <h2 class="section-title">Let's Find Your <em>Perfect Home</em></h2>
      <p class="cta-sub">Whether you're buying, selling, or just exploring — I'm here to help you make the best decision for you and your family.</p>
      <div class="cta-btns">
        <a href="mailto:${email}" class="btn-cta-primary">Schedule a Consultation</a>
        <a href="tel:${phone}" class="btn-cta-outline">Call ${phone}</a>
      </div>
    </div>
  </section>

  <!-- FOOTER -->
  <footer>
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <div class="logo-wrap">
            <span class="logo-name">${companyName}</span>
            <span class="logo-sub">Real Estate</span>
          </div>
          <p class="footer-brand-desc">Helping families find their perfect home in Greater ${city}. Your trusted partner for buying, selling, and investing in the ${provFull} market.</p>
        </div>
        <div class="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#about">About ${companyName.split(' ')[0]}</a></li>
            <li><a href="#services">Property Listings</a></li>
            <li><a href="#reviews">Client Reviews</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Resources</h4>
          <ul>
            <li><a href="#">Buyer's Guide</a></li>
            <li><a href="#">Seller's Guide</a></li>
            <li><a href="#">Market Reports</a></li>
            <li><a href="#">Open Houses</a></li>
            <li><a href="#">Free Resources</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Get in Touch</h4>
          <div class="footer-contact-item"><a href="tel:${phone}">${phone}</a></div>
          <div class="footer-contact-item"><a href="mailto:${email}">${email}</a></div>
          <div class="footer-contact-item">${city}, ${province}, Canada</div>
          ${brokerageName ? `<div class="footer-contact-item" style="margin-top:12px;font-size:13px;color:rgba(255,255,255,0.25)">${brokerageName}</div>` : ''}
        </div>
      </div>
      <div class="footer-bottom">
        <p class="footer-copy">© ${new Date().getFullYear()} ${companyName}. All rights reserved. ${brokerageName}.</p>
        <p class="footer-legal">The trademarks REALTOR®, REALTORS®, and the REALTOR® logo are controlled by The Canadian Real Estate Association (CREA).</p>
      </div>
    </div>
  </footer>

  <script>
    // Smooth counter animation for stats banner
    function animateCounters() {
      document.querySelectorAll('.stat-num[data-target]').forEach(el => {
        const target = parseInt(el.dataset.target);
        const suffix = el.dataset.suffix || '';
        const counter = el.querySelector('.counter');
        if (!counter) return;
        let start = 0;
        const duration = 1800;
        const startTime = performance.now();
        function update(now) {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          counter.textContent = Math.round(eased * target);
          if (progress < 1) requestAnimationFrame(update);
          else counter.textContent = target;
        }
        requestAnimationFrame(update);
      });
    }

    // Intersection observer for stats
    const statsSection = document.querySelector('.stats-banner');
    let animated = false;
    if (statsSection) {
      const obs = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && !animated) {
          animated = true;
          animateCounters();
        }
      }, { threshold: 0.4 });
      obs.observe(statsSection);
    }

    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 60) {
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
      } else {
        header.style.boxShadow = 'none';
      }
    });

    // Alert form submit
    document.querySelector('.btn-alert')?.addEventListener('click', () => {
      alert('Thank you! You will receive new listing alerts soon.');
    });
  </script>
</body>
</html>`;
}

async function getOrCreateProject(projectName: string): Promise<string | null> {
  const token = process.env.VERCEL_TOKEN;
  const teamId = process.env.VERCEL_ACCOUNT_ID;
  if (!token || !teamId) return null;
  const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };
  try {
    const listRes = await axios.get('https://api.vercel.com/v6/projects', { headers, params: { teamId } });
    const existing = listRes.data.projects?.find((p: any) => p.name === projectName);
    if (existing) return existing.id;
    const createRes = await axios.post('https://api.vercel.com/v6/projects',
      { name: projectName, publicSource: true },
      { headers, params: { teamId } }
    );
    return createRes.data.id;
  } catch (err: any) {
    console.error('Project error:', err.response?.data || err.message);
    return null;
  }
}

export async function deployToVercel(
  userId: string,
  siteId: string,
  templateId: string,
  details: Record<string, string>,
  siteName?: string
): Promise<DeployResult> {
  const token = process.env.VERCEL_TOKEN;
  const teamId = process.env.VERCEL_ACCOUNT_ID;
  console.log('=== Vercel Deploy ===');
  if (!token || !teamId) {
    return { success: false, error: 'Vercel credentials not configured' };
  }
  const projectName = siteName
    ? `webforge-${userId.substring(0, 8)}-${siteName.replace(/[^a-zA-Z0-9]/g, '-')}`.toLowerCase()
    : `webforge-${userId}-${siteId}`.toLowerCase();
  const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };
  try {
    const projectId = await getOrCreateProject(projectName);
    if (!projectId) return { success: false, error: 'Failed to create Vercel project' };
    console.log('Project ID:', projectId);
    const html = generateRealEstateHTML(details);
    const files = [{ file: 'index.html', data: Buffer.from(html).toString('base64'), encoding: 'base64' }];
    const deployRes = await axios.post('https://api.vercel.com/v6/deployments',
      { name: projectName, project: projectId, public: true, files },
      { headers, params: { teamId } }
    );
    const url = deployRes.data.url;
    const fullUrl = url.startsWith('http') ? url : `https://${url}`;
    console.log('Deployed to:', fullUrl);
    return { success: true, url: fullUrl };
  } catch (err: any) {
    console.error('Deploy error:', err.response?.data || err.message);
    return { success: false, error: err.response?.data?.error?.message || err.message };
  }
}