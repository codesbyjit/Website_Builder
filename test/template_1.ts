import axios from 'axios';

interface DeployResult {
  success: boolean;
  url?: string;
  error?: string;
}

const ORG = 'Website-Builder-Realty-Genie';

async function repoExists(octokit: any, repo: string): Promise<boolean> {
  try {
    await octokit.repos.get({
      owner: ORG,
      repo,
    });
    return true;
  } catch {
    return false;
  }
}

function generateRealEstateHTML(details: Record<string, string>): string {
  const {
    companyName = 'Sarah Mitchell',
    tagline = 'Your Trusted Real Estate Partner',
    brokerageName = 'RealtyGinie',
    licenseNumber = '',
    heroImage = '',
    email = 'sarah@realestate.com',
    phone = '(604) 555-0192',
    city = 'Vancouver',
    province = 'BC',
    heroTitle = 'Find Your Home. Move with Confidence.',
    heroSubtitle = 'Part of BC\'s #1-ranked team. Every buyer and seller gets the speed, strategy, and personal attention that gets results.',
    homesSOLD = '80+',
    yearsExp = '10+',
    rating = '5.0',
    neighborhood1 = 'Vancouver West',
    neighborhood2 = 'East Vancouver',
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
    review1Text = 'She patiently visited multiple homes with us, taking the time to clearly explain the pros and cons of each option.',
    review1Type = 'House',
    review2Name = 'Ashwani J.',
    review2Text = 'Finding the right property can be overwhelming, but she made the entire process smooth and stress-free.',
    review2Type = 'Condo',
    review3Name = 'Anna Can',
    review3Text = 'Mallika was absolutely amazing to work with! She was professional, knowledgeable, and always available to answer our questions.',
    review3Type = 'House',
    agentPhotoUrl = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80',
    googleReviewsUrl = '#',
    instagramHandle = '',
    teamName = '',
    teamRank = '#1',
    accentDark = '#0a0a0f',
    services = 'Home Buying\nHome Selling\nInvestment Properties',
    about = 'With a passion for real estate and a deep understanding of the local market, I\'m dedicated to making your home buying or selling experience exceptional.',
  } = details;

  const goldColor = '#C9A96E';

  const heroPhotoUrl = heroImage || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&q=80&auto=format';

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

  const neighborhoodImages = [
    'https://images.unsplash.com/photo-1559517282-523965c5a9c9?w=600&q=80&auto=format',
    'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80&auto=format',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&q=80&auto=format',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80&auto=format',
    'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&q=80&auto=format',
    'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=600&q=80&auto=format',
  ];

  const neighborhoods = [
    { name: neighborhood1, price: price1, image: neighborhoodImages[0] },
    { name: neighborhood2, price: price2, image: neighborhoodImages[1] },
    { name: neighborhood3, price: price3, image: neighborhoodImages[2] },
    { name: neighborhood4, price: price4, image: neighborhoodImages[3] },
    { name: neighborhood5, price: price5, image: neighborhoodImages[4] },
    { name: neighborhood6, price: price6, image: neighborhoodImages[5] },
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
      --gold: ${goldColor};
      --gold-light: ${goldColor}33;
      --gold-mid: ${goldColor}88;
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
    header { position: fixed; top: 0; left: 0; right: 0; z-index: 1000; background: rgba(255,255,255,0.95); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border-bottom: 1px solid var(--gray-200); transition: all 0.3s ease; }
    .header-inner { display: flex; align-items: center; justify-content: space-between; padding: 16px 0; gap: 24px; }
    .logo-wrap { display: flex; flex-direction: column; }
    .logo-name { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 700; color: var(--gray-900); letter-spacing: -0.3px; line-height: 1; }
    .logo-sub { font-size: 11px; font-weight: 400; color: var(--gold); letter-spacing: 1.5px; text-transform: uppercase; margin-top: 3px; }
    nav { display: flex; align-items: center; gap: 28px; }
    nav a { font-size: 14px; font-weight: 500; color: var(--gray-500); transition: color 0.2s; letter-spacing: 0.2px; }
    nav a:hover { color: var(--gray-900); }
    .header-right { display: flex; align-items: center; gap: 16px; flex-shrink: 0; }
    .header-phone { font-size: 14px; font-weight: 500; color: var(--gray-700); }
    .btn-talk { background: var(--dark); color: var(--white); padding: 10px 22px; border-radius: 6px; font-size: 13px; font-weight: 600; letter-spacing: 0.3px; transition: all 0.25s; white-space: nowrap; }
    .btn-talk:hover { background: var(--gold); color: var(--dark); }
    .hero { position: relative; min-height: 100vh; display: flex; align-items: center; background: var(--dark); overflow: hidden; padding-top: 80px; }
    .hero-bg { position: absolute; inset: 0; background-image: url('${heroPhotoUrl}'); background-size: cover; background-position: center; opacity: 0.18; }
    .hero-overlay { position: absolute; inset: 0; background: linear-gradient(105deg, var(--dark) 45%, transparent 100%); }
    .hero-inner { position: relative; z-index: 2; display: grid; grid-template-columns: 1fr 420px; gap: 60px; align-items: center; padding: 80px 0 60px; }
    .hero-badge { display: inline-flex; align-items: center; gap: 8px; background: var(--gold-light); border: 1px solid var(--gold-mid); color: var(--gold); padding: 7px 16px; border-radius: 50px; font-size: 12px; font-weight: 600; letter-spacing: 1.2px; text-transform: uppercase; margin-bottom: 28px; }
    .hero-badge::before { content: ''; width: 6px; height: 6px; background: var(--gold); border-radius: 50%; animation: pulse 2s infinite; }
    @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.6;transform:scale(0.85)} }
    .hero h1 { font-family: 'Playfair Display', serif; font-size: clamp(38px, 4.5vw, 60px); font-weight: 700; color: var(--white); line-height: 1.12; letter-spacing: -1px; margin-bottom: 22px; }
    .hero h1 em { font-style: italic; color: var(--gold); }
    .hero-desc { font-size: 17px; color: rgba(255,255,255,0.65); max-width: 520px; margin-bottom: 40px; line-height: 1.7; }
    .hero-actions { display: flex; gap: 14px; flex-wrap: wrap; margin-bottom: 56px; }
    .btn-primary-hero { background: var(--gold); color: var(--dark); padding: 16px 32px; border-radius: 7px; font-size: 15px; font-weight: 600; letter-spacing: 0.2px; transition: all 0.25s; display: inline-flex; align-items: center; gap: 8px; }
    .btn-primary-hero:hover { background: var(--white); transform: translateY(-2px); box-shadow: 0 12px 28px rgba(0,0,0,0.3); }
    .btn-outline-hero { background: transparent; color: var(--white); border: 1.5px solid rgba(255,255,255,0.3); padding: 16px 32px; border-radius: 7px; font-size: 15px; font-weight: 500; transition: all 0.25s; display: inline-flex; align-items: center; gap: 8px; }
    .btn-outline-hero:hover { border-color: var(--white); background: rgba(255,255,255,0.07); }
    .hero-stats { display: flex; gap: 36px; }
    .hero-stat-num { font-family: 'Playfair Display', serif; font-size: 36px; font-weight: 700; color: var(--white); line-height: 1; }
    .hero-stat-label { font-size: 12px; font-weight: 500; color: rgba(255,255,255,0.45); letter-spacing: 0.8px; text-transform: uppercase; margin-top: 4px; }
    .hero-agent-card { position: relative; background: var(--dark-3); border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; overflow: hidden; }
    .hero-agent-photo { width: 100%; height: 500px; object-fit: cover; object-position: top center; }
    .hero-agent-info { position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%); padding: 40px 28px 28px; }
    .hero-agent-badge { display: inline-block; background: var(--gold); color: var(--dark); font-size: 10px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; padding: 5px 12px; border-radius: 4px; margin-bottom: 12px; }
    .hero-agent-name { font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700; color: var(--white); display: block; line-height: 1.2; }
    .hero-agent-brokerage { font-size: 13px; color: rgba(255,255,255,0.55); margin-top: 4px; }
    .hero-stars { display: flex; gap: 3px; margin-top: 10px; }
    .hero-stars span { color: var(--gold); font-size: 14px; }
    .stats-banner { background: var(--dark-2); padding: 52px 0; border-top: 1px solid rgba(255,255,255,0.06); }
    .stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; }
    .stat-item { text-align: center; padding: 12px 24px; border-right: 1px solid rgba(255,255,255,0.08); }
    .stat-item:last-child { border-right: none; }
    .stat-num { font-family: 'Playfair Display', serif; font-size: 48px; font-weight: 700; color: var(--white); line-height: 1; }
    .stat-label { font-size: 12px; font-weight: 500; color: rgba(255,255,255,0.4); letter-spacing: 1.2px; text-transform: uppercase; margin-top: 8px; }
    .section-eyebrow { font-size: 11px; font-weight: 600; letter-spacing: 2.5px; text-transform: uppercase; color: var(--gold); margin-bottom: 14px; display: flex; align-items: center; gap: 10px; }
    .section-eyebrow::after { content: ''; flex: 1; height: 1px; background: var(--gold-mid); max-width: 40px; }
    .section-title { font-family: 'Playfair Display', serif; font-size: clamp(30px, 3.5vw, 44px); font-weight: 700; color: var(--gray-900); line-height: 1.15; letter-spacing: -0.5px; }
    .section-title em { font-style: italic; color: var(--gold); }
    .properties { padding: 100px 0; background: var(--off-white); }
    .section-head { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 52px; }
    .view-all-link { font-size: 14px; font-weight: 600; color: var(--gold); border-bottom: 1px solid var(--gold); padding-bottom: 2px; transition: opacity 0.2s; }
    .view-all-link:hover { opacity: 0.7; }
    .prop-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; }
    .prop-card { background: var(--white); border-radius: 14px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.06); transition: all 0.3s; }
    .prop-card:hover { transform: translateY(-6px); box-shadow: 0 20px 40px rgba(0,0,0,0.12); }
    .prop-img-wrap { position: relative; height: 230px; overflow: hidden; }
    .prop-img-wrap img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
    .prop-card:hover .prop-img-wrap img { transform: scale(1.05); }
    .prop-tag { position: absolute; top: 16px; left: 16px; background: var(--gold); color: var(--dark); font-size: 11px; font-weight: 700; letter-spacing: 0.8px; text-transform: uppercase; padding: 5px 12px; border-radius: 4px; }
    .prop-body { padding: 24px; }
    .prop-price { font-family: 'Playfair Display', serif; font-size: 24px; font-weight: 700; color: var(--gray-900); margin-bottom: 6px; }
    .prop-address { font-size: 14px; color: var(--gray-500); margin-bottom: 16px; }
    .prop-specs { display: flex; gap: 18px; font-size: 13px; color: var(--gray-500); padding-top: 16px; border-top: 1px solid var(--gray-200); }
    .prop-spec { display: flex; align-items: center; gap: 5px; }
    .about { padding: 100px 0; }
    .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
    .about-photo-wrap { position: relative; }
    .about-photo { width: 100%; height: 580px; object-fit: cover; border-radius: 16px; object-position: top center; }
    .about-photo-badge { position: absolute; bottom: -20px; right: -20px; background: var(--dark); color: var(--white); border-radius: 14px; padding: 24px 28px; border: 2px solid rgba(255,255,255,0.08); box-shadow: 0 20px 40px rgba(0,0,0,0.2); }
    .about-badge-num { font-family: 'Playfair Display', serif; font-size: 40px; font-weight: 700; color: var(--gold); line-height: 1; }
    .about-badge-label { font-size: 13px; color: rgba(255,255,255,0.55); margin-top: 4px; }
    .about-content .section-title { margin-bottom: 10px; }
    .about-brokerage { font-size: 14px; color: var(--gold); font-weight: 500; letter-spacing: 0.5px; margin-bottom: 24px; }
    .about-text { font-size: 16px; color: var(--gray-500); line-height: 1.8; margin-bottom: 24px; }
    .about-chips { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 36px; }
    .about-chip { background: var(--gray-100); border: 1px solid var(--gray-200); border-radius: 50px; padding: 8px 18px; font-size: 13px; font-weight: 500; color: var(--gray-700); }
    .btn-dark { display: inline-flex; align-items: center; gap: 9px; background: var(--dark); color: var(--white); padding: 16px 30px; border-radius: 8px; font-size: 15px; font-weight: 600; transition: all 0.25s; }
    .btn-dark:hover { background: var(--gold); color: var(--dark); }
    .apart { padding: 100px 0; background: var(--gray-100); }
    .apart-header { text-align: center; max-width: 580px; margin: 0 auto 60px; }
    .apart-header .section-eyebrow { justify-content: center; }
    .apart-header .section-eyebrow::after { display: none; }
    .apart-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
    .apart-card { background: var(--white); border-radius: 14px; padding: 36px 28px; border: 1px solid var(--gray-200); transition: all 0.3s; }
    .apart-card:hover { border-color: var(--gold); transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.08); }
    .apart-icon { width: 52px; height: 52px; border-radius: 12px; background: var(--dark); display: flex; align-items: center; justify-content: center; margin-bottom: 22px; }
    .apart-icon svg { color: var(--gold); }
    .apart-card h3 { font-size: 17px; font-weight: 600; color: var(--gray-900); margin-bottom: 10px; }
    .apart-card p { font-size: 14px; color: var(--gray-400); line-height: 1.7; }
    .process { padding: 100px 0; }
    .process-header { text-align: center; max-width: 600px; margin: 0 auto 64px; }
    .process-header .section-eyebrow { justify-content: center; }
    .process-header .section-eyebrow::after { display: none; }
    .process-steps { display: grid; grid-template-columns: repeat(3, 1fr); gap: 40px; position: relative; }
    .process-steps::before { content: ''; position: absolute; top: 36px; left: calc(16.66% + 20px); right: calc(16.66% + 20px); height: 1px; background: var(--gray-200); }
    .process-step { text-align: center; }
    .step-num { width: 72px; height: 72px; border-radius: 50%; background: var(--dark); color: var(--white); font-family: 'Playfair Display', serif; font-size: 24px; font-weight: 700; display: flex; align-items: center; justify-content: center; margin: 0 auto 28px; position: relative; z-index: 1; border: 3px solid transparent; transition: all 0.3s; }
    .process-step:hover .step-num { background: var(--gold); color: var(--dark); border-color: var(--gold); }
    .process-step h3 { font-size: 18px; font-weight: 600; color: var(--gray-900); margin-bottom: 10px; }
    .process-step p { font-size: 15px; color: var(--gray-400); line-height: 1.7; }
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
    .review-card { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 32px; transition: all 0.3s; }
    .review-card:hover { border-color: var(--gold-mid); background: rgba(255,255,255,0.07); }
    .review-quote { color: var(--gold); font-size: 40px; font-family: 'Playfair Display', serif; line-height: 1; margin-bottom: 16px; }
    .review-text { font-size: 15px; color: rgba(255,255,255,0.65); line-height: 1.8; margin-bottom: 24px; font-style: italic; }
    .review-author { display: flex; align-items: center; gap: 14px; }
    .review-avatar { width: 44px; height: 44px; border-radius: 50%; background: var(--gold); display: flex; align-items: center; justify-content: center; font-size: 16px; font-weight: 700; color: var(--dark); flex-shrink: 0; }
    .review-name { font-size: 15px; font-weight: 600; color: var(--white); }
    .review-type { font-size: 13px; color: rgba(255,255,255,0.4); margin-top: 2px; }
    .neighborhoods { padding: 100px 0; background: var(--off-white); }
    .neighborhoods-header { text-align: center; max-width: 600px; margin: 0 auto 56px; }
    .neighborhoods-header .section-eyebrow { justify-content: center; }
    .neighborhoods-header .section-eyebrow::after { display: none; }
    .neighborhoods-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
    .neighborhood-card { position: relative; height: 200px; border-radius: 14px; overflow: hidden; cursor: pointer; transition: all 0.35s; background-size: cover; background-position: center; }
    .neighborhood-card:hover { transform: scale(1.02); }
    .neighborhood-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 100%); display: flex; flex-direction: column; justify-content: flex-end; padding: 24px; transition: all 0.3s; }
    .neighborhood-card:hover .neighborhood-overlay { background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 100%); }
    .neighborhood-name { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 700; color: var(--white); }
    .neighborhood-price { font-size: 13px; color: var(--gold); margin-top: 4px; font-weight: 500; }
    .instagram { padding: 80px 0; background: var(--white); }
    .instagram-header { text-align: center; margin-bottom: 40px; }
    .ig-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 6px; margin-bottom: 32px; }
    .ig-item { position: relative; aspect-ratio: 1; overflow: hidden; cursor: pointer; }
    .ig-item img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s ease; }
    .ig-item:hover img { transform: scale(1.08); }
    .ig-item-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.4); opacity: 0; transition: opacity 0.3s; display: flex; align-items: center; justify-content: center; }
    .ig-item:hover .ig-item-overlay { opacity: 1; }
    .alerts { padding: 80px 0; background: var(--dark-3); }
    .alerts-inner { max-width: 700px; margin: 0 auto; text-align: center; }
    .alerts .section-title { color: var(--white); margin-bottom: 10px; }
    .alerts-sub { font-size: 16px; color: rgba(255,255,255,0.5); margin-bottom: 36px; }
    .alerts-form { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 12px; margin-bottom: 16px; }
    .form-select { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12); color: rgba(255,255,255,0.7); padding: 14px 16px; border-radius: 8px; font-size: 14px; font-family: inherit; outline: none; cursor: pointer; appearance: none; -webkit-appearance: none; background-image: url("data:image/svg+xml,%3Csvg width='10' height='6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23C9A96E' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 14px center; transition: border-color 0.2s; }
    .form-select:focus { border-color: var(--gold); }
    .form-select option { background: var(--dark-2); color: var(--white); }
    .btn-alert { grid-column: 1 / -1; background: var(--gold); color: var(--dark); padding: 16px; border-radius: 8px; font-size: 15px; font-weight: 700; cursor: pointer; border: none; font-family: inherit; transition: all 0.25s; letter-spacing: 0.3px; }
    .btn-alert:hover { background: var(--white); }
    .alerts-note { font-size: 12px; color: rgba(255,255,255,0.3); }
    .cta-section { padding: 100px 0; background: linear-gradient(135deg, var(--dark) 0%, var(--dark-2) 100%); text-align: center; position: relative; overflow: hidden; }
    .cta-section::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse at 50% 120%, ${goldColor}20 0%, transparent 60%); }
    .cta-section .section-title { color: var(--white); margin-bottom: 18px; position: relative; }
    .cta-sub { font-size: 17px; color: rgba(255,255,255,0.5); max-width: 540px; margin: 0 auto 44px; position: relative; }
    .cta-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; position: relative; }
    .btn-cta-primary { background: var(--gold); color: var(--dark); padding: 18px 40px; border-radius: 8px; font-size: 15px; font-weight: 700; transition: all 0.25s; }
    .btn-cta-primary:hover { background: var(--white); transform: translateY(-2px); }
    .btn-cta-outline { background: transparent; color: var(--white); border: 1.5px solid rgba(255,255,255,0.25); padding: 18px 40px; border-radius: 8px; font-size: 15px; font-weight: 500; transition: all 0.25s; }
    .btn-cta-outline:hover { border-color: var(--white); background: rgba(255,255,255,0.05); }
    footer { background: var(--dark); border-top: 1px solid rgba(255,255,255,0.06); padding: 60px 0 36px; }
    .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 48px; margin-bottom: 52px; }
    .footer-brand .logo-name { color: var(--white); font-size: 22px; }
    .footer-brand .logo-sub { color: var(--gold); }
    .footer-brand-desc { font-size: 14px; color: rgba(255,255,255,0.4); line-height: 1.8; margin-top: 16px; max-width: 280px; }
    .footer-col h4 { font-size: 12px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; color: rgba(255,255,255,0.3); margin-bottom: 20px; }
    .footer-col ul { list-style: none; display: flex; flex-direction: column; gap: 10px; }
    .footer-col ul li a { font-size: 14px; color: rgba(255,255,255,0.55); transition: color 0.2s; }
    .footer-col ul li a:hover { color: var(--gold); }
    .footer-contact-item { font-size: 14px; color: rgba(255,255,255,0.55); margin-bottom: 8px; }
    .footer-contact-item a:hover { color: var(--gold); }
    .footer-bottom { border-top: 1px solid rgba(255,255,255,0.06); padding-top: 28px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; }
    .footer-copy { font-size: 13px; color: rgba(255,255,255,0.25); }
    .footer-legal { font-size: 12px; color: rgba(255,255,255,0.2); max-width: 500px; text-align: right; }
    @media (max-width: 1024px) { .hero-inner { grid-template-columns: 1fr; } .hero-agent-card { display: none; } .about-grid { grid-template-columns: 1fr; gap: 50px; } .footer-grid { grid-template-columns: 1fr 1fr; gap: 36px; } .apart-grid { grid-template-columns: repeat(2, 1fr); } }
    @media (max-width: 768px) { nav { display: none; } .header-phone { display: none; } .prop-grid, .reviews-grid, .neighborhoods-grid, .process-steps { grid-template-columns: 1fr; } .stats-grid { grid-template-columns: repeat(2, 1fr); } .ig-grid { grid-template-columns: repeat(3, 1fr); } .apart-grid { grid-template-columns: 1fr; } .alerts-form { grid-template-columns: 1fr; } .footer-grid { grid-template-columns: 1fr; gap: 32px; } .footer-legal { text-align: left; } }
  </style>
</head>
<body>
  <header>
    <div class="container">
      <div class="header-inner">
        <a href="index.html" class="logo-wrap">
          <span class="logo-name">${companyName}</span>
          <span class="logo-sub">Real Estate</span>
        </a>
        <nav>
          <a href="index.html">Home</a>
          <a href="index.html#about">About</a>
          <a href="listings.html">Listings</a>
          <a href="index.html#reviews">Reviews</a>
          <a href="index.html#neighborhoods">Areas</a>
          <a href="blog.html">Blog</a>
          <a href="index.html#resources">Resources</a>
          <a href="index.html#contact">Contact</a>
        </nav>
        <div class="header-right">
          <a href="tel:${phone}" class="header-phone">${phone}</a>
          <a href="index.html#contact" class="btn-talk">Let's Talk</a>
        </div>
      </div>
    </div>
  </header>

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
              <div class="hero-stat-num">${rating}</div>
              <div class="hero-stat-label">Star Rating</div>
            </div>
          </div>
        </div>
        <div class="hero-agent-card">
          <img src="${agentPhotoUrl}" alt="${companyName}" class="hero-agent-photo">
          <div class="hero-agent-info">
            <div class="hero-agent-badge">${teamRank} Team in ${province}</div>
            <span class="hero-agent-name">${companyName}</span>
            <div class="hero-agent-brokerage">${brokerageName}</div>
            <div class="hero-stars"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="stats-banner">
    <div class="container">
      <div class="stats-grid">
        <div class="stat-item">
          <div class="stat-num">${homesSOLD}</div>
          <div class="stat-label">Homes Sold</div>
        </div>
        <div class="stat-item">
          <div class="stat-num">${yearsExp}</div>
          <div class="stat-label">Years Experience</div>
        </div>
        <div class="stat-item">
          <div class="stat-num">${rating}</div>
          <div class="stat-label">Star Rating</div>
        </div>
        <div class="stat-item">
          <div class="stat-num">${province}</div>
          <div class="stat-label">Province</div>
        </div>
      </div>
    </div>
  </section>

  <section class="properties" id="listings">
    <div class="container">
      <div class="section-head">
        <div>
          <div class="section-eyebrow">Featured Properties</div>
          <h2 class="section-title">Find Your <em>Dream Home</em></h2>
        </div>
        <a href="listings.html" class="view-all-link">View All Properties →</a>
      </div>
      <div class="prop-grid">
        ${propertyImages.map((img, i) => `
        <div class="prop-card">
          <div class="prop-img-wrap">
            <img src="${img}" alt="Property ${i+1}" loading="lazy">
            <span class="prop-tag">For Sale</span>
          </div>
          <div class="prop-body">
            <div class="prop-price">${i === 0 ? '$2,450,000' : i === 1 ? '$1,850,000' : '$975,000'}</div>
            <div class="prop-address">${i === 0 ? '100 King St W, Vancouver' : i === 1 ? '45 Maple Ave, North Vancouver' : '88 Oak Street, Surrey'}</div>
            <div class="prop-specs">
              <span class="prop-spec"><svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3"/></svg> ${i === 0 ? '3' : i === 1 ? '5' : '3'} Beds</span>
              <span class="prop-spec"><svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"/></svg> ${i === 0 ? '3' : i === 1 ? '4' : '2'} Baths</span>
            </div>
          </div>
        </div>
        `).join('')}
      </div>
    </div>
  </section>

  <section class="about" id="about">
    <div class="container">
      <div class="about-grid">
        <div class="about-photo-wrap">
          <img src="${agentPhotoUrl}" alt="${companyName}" class="about-photo">
          <div class="about-photo-badge">
            <div class="about-badge-num">${homesSOLD}</div>
            <div class="about-badge-label">Homes Sold</div>
          </div>
        </div>
        <div class="about-content">
          <div class="section-eyebrow">Meet Your Realtor</div>
          <h2 class="section-title">${companyName}</h2>
          <div class="about-brokerage">${brokerageName}</div>
          <p class="about-text">${about}</p>
          <div class="about-chips">
            ${servicesList.map(s => `<span class="about-chip">${s}</span>`).join('')}
          </div>
          <a href="#contact" class="btn-dark">
            Get in Touch
            <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
          </a>
        </div>
      </div>
    </div>
  </section>

  <section class="apart" id="services">
    <div class="container">
      <div class="apart-header">
        <div class="section-eyebrow">Get to Know Me</div>
        <h2 class="section-title">See What Sets Me <em>Apart</em></h2>
      </div>
      <div class="apart-grid">
        <div class="apart-card">
          <div class="apart-icon"><svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg></div>
          <h3>Available 7 Days a Week</h3>
          <p>Anytime, evenings and weekends included</p>
        </div>
        <div class="apart-card">
          <div class="apart-icon"><svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg></div>
          <h3>Same-Day Communication</h3>
          <p>Questions answered fast, every time</p>
        </div>
        <div class="apart-card">
          <div class="apart-icon"><svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg></div>
          <h3>No-Pressure Guidance</h3>
          <p>Your pace, your decision, always</p>
        </div>
        <div class="apart-card">
          <div class="apart-icon"><svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg></div>
          <h3>Expert Negotiator</h3>
          <p>Fighting for the best deal on your behalf</p>
        </div>
      </div>
    </div>
  </section>

  <section class="process">
    <div class="container">
      <div class="process-header">
        <div class="section-eyebrow">How I Work With You</div>
        <h2 class="section-title">The <em>Process</em></h2>
      </div>
      <div class="process-steps">
        <div class="process-step">
          <div class="step-num">01</div>
          <h3>Free Strategy Call</h3>
          <p>We align on your goals, timeline, and must-haves. No obligation.</p>
        </div>
        <div class="process-step">
          <div class="step-num">02</div>
          <h3>Personalized Plan</h3>
          <p>A tailored market strategy built around you, not a template.</p>
        </div>
        <div class="process-step">
          <div class="step-num">03</div>
          <h3>Guided to Close</h3>
          <p>Every detail handled: offers, negotiations, and paperwork, start to finish.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="reviews" id="reviews">
    <div class="container">
      <div class="reviews-header">
        <div class="section-eyebrow">Google Reviews</div>
        <h2 class="section-title">Client <em>Testimonials</em></h2>
        <div class="reviews-rating">
          <div class="reviews-stars"><span>★</span><span>★</span><span>★</span><span>★</span><span>★</span></div>
          <span class="reviews-rating-text">${rating} based on ${homesSOLD} verified reviews</span>
        </div>
      </div>
      <div class="reviews-grid">
        ${reviews.filter(r => r.name).map(r => `
        <div class="review-card">
          <div class="review-quote">"</div>
          <p class="review-text">${r.text}</p>
          <div class="review-author">
            <div class="review-avatar">${r.name.charAt(0)}</div>
            <div>
              <div class="review-name">${r.name}</div>
              <div class="review-type">${r.type}</div>
            </div>
          </div>
        </div>
        `).join('')}
      </div>
    </div>
  </section>

  <section class="neighborhoods" id="neighborhoods">
    <div class="container">
      <div class="neighborhoods-header">
        <div class="section-eyebrow">Explore the Area</div>
        <h2 class="section-title">Greater ${city} <em>Neighborhoods</em></h2>
        <p style="font-size:16px;color:var(--gray-400);margin-top:14px;">Discover the unique character of each neighborhood and find the community that feels like home.</p>
      </div>
      <div class="neighborhoods-grid">
        ${neighborhoods.map(n => `
        <div class="neighborhood-card" style="background-image: url('${n.image}')">
          <div class="neighborhood-overlay">
            <div class="neighborhood-name">${n.name}</div>
            <div class="neighborhood-price">From ${n.price}</div>
          </div>
        </div>
        `).join('')}
      </div>
    </div>
  </section>

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
          Follow @${instagramHandle.replace('@','')}
        </a>
      </div>
    </div>
  </section>
  ` : ''}

  <section class="alerts" id="resources">
    <div class="container">
      <div class="alerts-inner">
        <h2 class="section-title">Get New Listing Alerts</h2>
        <p class="alerts-sub">Be the first to know when properties matching your criteria hit the market. Unsubscribe anytime.</p>
        <form class="alerts-form" onsubmit="event.preventDefault(); alert('Thank you! You will receive listing alerts soon.');">
          <select class="form-select">
            <option>Preferred Area</option>
            <option>Vancouver West</option>
            <option>East Vancouver</option>
            <option>Burnaby</option>
            <option>Surrey</option>
          </select>
          <select class="form-select">
            <option>Price Range</option>
            <option>Under $500K</option>
            <option>$500K - $750K</option>
            <option>$750K - $1M</option>
            <option>$1M - $1.5M</option>
            <option>$1.5M - $2M</option>
            <option>$2M+</option>
          </select>
          <select class="form-select">
            <option>Property Type</option>
            <option>House</option>
            <option>Condo</option>
            <option>Townhouse</option>
            <option>Duplex</option>
          </select>
          <button type="submit" class="btn-alert">Start Alerts</button>
        </form>
        <p class="alerts-note">By subscribing, you agree to receive marketing communications.</p>
      </div>
    </div>
  </section>

  <section class="cta-section" id="contact">
    <div class="container">
      <h2 class="section-title">Ready to Take the Next Step?</h2>
      <p class="cta-sub">Let's find your perfect home. Whether you're buying, selling, or just exploring - I'm here to help.</p>
      <div class="cta-btns">
        <a href="tel:${phone}" class="btn-cta-primary">Call ${phone}</a>
        <a href="mailto:${email}" class="btn-cta-outline">Email Me</a>
      </div>
    </div>
  </section>

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
            <li><a href="index.html">Home</a></li>
            <li><a href="index.html#about">About</a></li>
            <li><a href="listings.html">Listings</a></li>
            <li><a href="index.html#reviews">Reviews</a></li>
            <li><a href="index.html#neighborhoods">Areas</a></li>
            <li><a href="blog.html">Blog</a></li>
            <li><a href="index.html#contact">Contact</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Resources</h4>
          <ul>
            <li><a href="index.html#resources">Buyer's Guide</a></li>
            <li><a href="index.html#resources">Seller's Guide</a></li>
            <li><a href="index.html#resources">Market Reports</a></li>
            <li><a href="index.html#resources">Open Houses</a></li>
            <li><a href="index.html#resources">FAQ</a></li>
            <li><a href="index.html#resources">Free Resources</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Get in Touch</h4>
          <div class="footer-contact-item"><a href="tel:${phone}">${phone}</a></div>
          <div class="footer-contact-item"><a href="mailto:${email}">${email}</a></div>
          <div class="footer-contact-item">${city}, ${province}, Canada</div>
        </div>
      </div>
      <div class="footer-bottom">
        <p class="footer-copy">© ${new Date().getFullYear()} ${companyName}. All rights reserved.</p>
        <p class="footer-legal">The trademarks REALTOR®, REALTORS®, and the REALTOR® logo are controlled by The Canadian Real Estate Association (CREA).</p>
      </div>
    </div>
  </footer>
</body>
</html>`;
}

function generateListingsPage(details: Record<string, string>): string {
  const { companyName = 'Real Estate', city = 'Toronto', province = 'ON', phone = '(604) 555-0192', email = 'hello@realestate.com' } = details;
  const provinceName: Record<string, string> = { ON: 'Ontario', BC: 'British Columbia', AB: 'Alberta', QC: 'Quebec' };
  const provFull = provinceName[province] || province;

  const listings = [
    { title: 'Luxury Downtown Penthouse', price: '$2,450,000', beds: 3, baths: 3, sqft: '2,800', address: '100 King St W, Toronto', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80', type: 'Condo' },
    { title: 'Modern Family Home', price: '$1,850,000', beds: 5, baths: 4, sqft: '3,200', address: '45 Maple Avenue, North York', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', type: 'House' },
    { title: 'Cozy Townhouse', price: '$975,000', beds: 3, baths: 2, sqft: '1,650', address: '88 Oak Street, Scarborough', image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80', type: 'Townhouse' },
    { title: 'Waterfront Condo', price: '$1,250,000', beds: 2, baths: 2, sqft: '1,400', address: '220 Lakeshore Blvd, Toronto', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80', type: 'Condo' },
    { title: 'Executive Estate', price: '$3,200,000', beds: 6, baths: 5, sqft: '4,500', address: '15 Park Lane, Richmond Hill', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80', type: 'House' },
    { title: 'Starter Home', price: '$725,000', beds: 2, baths: 1, sqft: '950', address: '67 Cedar Road, Mississauga', image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80', type: 'House' },
  ];

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Property Listings | ${companyName}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
    :root { --gold: #C9A96E; --gold-light: #C9A96E33; --gold-mid: #C9A96E88; --dark: #0a0a0f; --dark-2: #13131a; --dark-3: #1c1c26; --white: #ffffff; --off-white: #faf9f7; --gray-100: #f4f3f0; --gray-200: #e8e6e1; --gray-400: #9d9b95; --gray-500: #6b6963; --gray-700: #3a3935; --gray-900: #1a1917; }
    html { scroll-behavior: smooth; }
    body { font-family: 'DM Sans', sans-serif; color: var(--gray-700); background: var(--white); line-height: 1.65; overflow-x: hidden; }
    a { text-decoration: none; color: inherit; }
    img { max-width: 100%; display: block; }
    .container { max-width: 1200px; margin: 0 auto; padding: 0 28px; }
    header { position: fixed; top: 0; left: 0; right: 0; z-index: 1000; background: rgba(255,255,255,0.95); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border-bottom: 1px solid var(--gray-200); transition: all 0.3s ease; }
    .header-inner { display: flex; align-items: center; justify-content: space-between; padding: 16px 0; gap: 24px; }
    .logo-wrap { display: flex; flex-direction: column; }
    .logo-name { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 700; color: var(--gray-900); letter-spacing: -0.3px; line-height: 1; }
    .logo-sub { font-size: 11px; font-weight: 400; color: var(--gold); letter-spacing: 1.5px; text-transform: uppercase; margin-top: 3px; }
    nav { display: flex; align-items: center; gap: 28px; }
    nav a { font-size: 14px; font-weight: 500; color: var(--gray-500); transition: color 0.2s; letter-spacing: 0.2px; }
    nav a:hover { color: var(--gray-900); }
    .header-right { display: flex; align-items: center; gap: 16px; flex-shrink: 0; }
    .header-phone { font-size: 14px; font-weight: 500; color: var(--gray-700); }
    .btn-talk { background: var(--dark); color: var(--white); padding: 10px 22px; border-radius: 6px; font-size: 13px; font-weight: 600; letter-spacing: 0.3px; transition: all 0.25s; white-space: nowrap; }
    .btn-talk:hover { background: var(--gold); color: var(--dark); }
    .page-hero { background: var(--dark); padding: 140px 0 80px; text-align: center; position: relative; overflow: hidden; }
    .page-hero::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse at 50% 0%, var(--gold) 0%, transparent 70%); opacity: 0.1; }
    .page-hero h1 { font-family: 'Playfair Display', serif; font-size: clamp(36px, 5vw, 56px); font-weight: 700; color: var(--white); line-height: 1.12; letter-spacing: -1px; margin-bottom: 18px; position: relative; }
    .page-hero p { font-size: 17px; color: rgba(255,255,255,0.6); max-width: 540px; margin: 0 auto; position: relative; }
    .filters { background: var(--gray-100); padding: 24px 0; border-bottom: 1px solid var(--gray-200); }
    .filters-inner { display: flex; gap: 16px; flex-wrap: wrap; align-items: center; }
    .filters select { padding: 12px 16px; border: 1px solid var(--gray-200); border-radius: 8px; font-size: 14px; min-width: 160px; background: white; font-family: inherit; cursor: pointer; }
    .filters .count { font-size: 14px; color: var(--gray-500); margin-left: auto; }
    .listings-section { padding: 64px 0; }
    .section-title { font-family: 'Playfair Display', serif; font-size: clamp(28px, 3vw, 36px); font-weight: 700; color: var(--gray-900); margin-bottom: 40px; }
    .listings-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 28px; }
    .listing-card { background: var(--white); border: 1px solid var(--gray-200); border-radius: 14px; overflow: hidden; transition: all 0.3s; }
    .listing-card:hover { transform: translateY(-6px); box-shadow: 0 16px 32px rgba(0,0,0,0.1); border-color: var(--gold); }
    .listing-img { height: 240px; background-size: cover; background-position: center; position: relative; }
    .listing-tag { position: absolute; top: 16px; left: 16px; background: var(--gold); color: var(--dark); padding: 6px 12px; border-radius: 6px; font-size: 12px; font-weight: 600; }
    .listing-content { padding: 24px; }
    .listing-price { font-family: 'Playfair Display', serif; font-size: 26px; font-weight: 700; color: var(--gray-900); margin-bottom: 6px; }
    .listing-title { font-size: 17px; font-weight: 600; color: var(--gray-900); margin-bottom: 6px; }
    .listing-address { font-size: 14px; color: var(--gray-500); margin-bottom: 16px; }
    .listing-stats { display: flex; gap: 20px; padding-top: 16px; border-top: 1px solid var(--gray-200); }
    .listing-stat { font-size: 14px; color: var(--gray-500); }
    .listing-stat strong { color: var(--gray-900); }
    footer { background: var(--dark); border-top: 1px solid rgba(255,255,255,0.06); padding: 60px 0 36px; }
    .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 48px; margin-bottom: 52px; }
    .footer-brand .logo-name { color: var(--white); font-size: 22px; }
    .footer-brand .logo-sub { color: var(--gold); }
    .footer-brand-desc { font-size: 14px; color: rgba(255,255,255,0.4); line-height: 1.8; margin-top: 16px; max-width: 280px; }
    .footer-col h4 { font-size: 12px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; color: rgba(255,255,255,0.3); margin-bottom: 20px; }
    .footer-col ul { list-style: none; display: flex; flex-direction: column; gap: 10px; }
    .footer-col ul li a { font-size: 14px; color: rgba(255,255,255,0.55); transition: color 0.2s; }
    .footer-col ul li a:hover { color: var(--gold); }
    .footer-contact-item { font-size: 14px; color: rgba(255,255,255,0.55); margin-bottom: 8px; }
    .footer-contact-item a:hover { color: var(--gold); }
    .footer-bottom { border-top: 1px solid rgba(255,255,255,0.06); padding-top: 28px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; }
    .footer-copy { font-size: 13px; color: rgba(255,255,255,0.25); }
    .footer-legal { font-size: 12px; color: rgba(255,255,255,0.2); max-width: 500px; text-align: right; }
    @media (max-width: 1024px) { .footer-grid { grid-template-columns: 1fr 1fr; gap: 36px; } }
    @media (max-width: 768px) { nav { display: none; } .page-hero h1 { font-size: 32px; } .listings-grid { grid-template-columns: 1fr; } .footer-grid { grid-template-columns: 1fr; gap: 32px; } .footer-legal { text-align: left; } }
  </style>
</head>
<body>
  <header>
    <div class="container">
      <div class="header-inner">
        <a href="index.html" class="logo-wrap">
          <span class="logo-name">${companyName}</span>
          <span class="logo-sub">Real Estate</span>
        </a>
        <nav>
          <a href="index.html">Home</a>
          <a href="index.html#about">About</a>
          <a href="listings.html">Listings</a>
          <a href="index.html#reviews">Reviews</a>
          <a href="index.html#neighborhoods">Areas</a>
          <a href="blog.html">Blog</a>
          <a href="index.html#resources">Resources</a>
          <a href="index.html#contact">Contact</a>
        </nav>
        <div class="header-right">
          <a href="tel:${phone}" class="header-phone">${phone}</a>
          <a href="index.html#contact" class="btn-talk">Let's Talk</a>
        </div>
      </div>
    </div>
  </header>
  <section class="page-hero">
    <div class="container"><h1>Property Listings</h1><p>Browse our available properties in ${city}, ${provFull}</p></div>
  </section>
  <section class="filters">
    <div class="container">
      <div class="filters-inner">
        <select><option>All Types</option><option>House</option><option>Condo</option><option>Townhouse</option></select>
        <select><option>All Prices</option><option>Under $1M</option><option>$1M - $2M</option><option>$2M - $3M</option><option>$3M+</option></select>
        <select><option>All Bedrooms</option><option>2+</option><option>3+</option><option>4+</option><option>5+</option></select>
        <span class="count">${listings.length} properties found</span>
      </div>
    </div>
  </section>
  <section class="listings">
    <div class="container">
      <div class="listings-grid">
        ${listings.map(l => `<div class="listing-card"><div class="listing-img" style="background-image: url('${l.image}')"><span class="listing-tag">${l.type}</span></div><div class="listing-content"><div class="listing-price">${l.price}</div><div class="listing-title">${l.title}</div><div class="listing-address">${l.address}, ${city}</div><div class="listing-stats"><span class="listing-stat"><strong>${l.beds}</strong> Beds</span><span class="listing-stat"><strong>${l.baths}</strong> Baths</span><span class="listing-stat"><strong>${l.sqft}</strong> sqft</span></div></div></div>`).join('')}
      </div>
    </div>
  </section>
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
            <li><a href="index.html">Home</a></li>
            <li><a href="index.html#about">About</a></li>
            <li><a href="listings.html">Listings</a></li>
            <li><a href="index.html#reviews">Reviews</a></li>
            <li><a href="index.html#neighborhoods">Areas</a></li>
            <li><a href="blog.html">Blog</a></li>
            <li><a href="index.html#contact">Contact</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Resources</h4>
          <ul>
            <li><a href="index.html#resources">Buyer's Guide</a></li>
            <li><a href="index.html#resources">Seller's Guide</a></li>
            <li><a href="index.html#resources">Market Reports</a></li>
            <li><a href="index.html#resources">Open Houses</a></li>
            <li><a href="index.html#resources">FAQ</a></li>
            <li><a href="index.html#resources">Free Resources</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Get in Touch</h4>
          <div class="footer-contact-item"><a href="tel:${phone}">${phone}</a></div>
          <div class="footer-contact-item"><a href="mailto:${email}">${email}</a></div>
          <div class="footer-contact-item">${city}, ${province}, Canada</div>
        </div>
      </div>
      <div class="footer-bottom">
        <p class="footer-copy">&copy; ${new Date().getFullYear()} ${companyName}. All rights reserved.</p>
        <p class="footer-legal">The trademarks REALTOR&reg;, REALTORS&reg;, and the REALTOR&reg; logo are controlled by The Canadian Real Estate Association (CREA).</p>
      </div>
    </div>
  </footer>
</body>
</html>`;
}

function generateBlogPage(details: Record<string, string>): string {
  const { companyName = 'Real Estate', city = 'Toronto', province = 'ON', phone = '(604) 555-0192', email = 'hello@realestate.com' } = details;
  const provinceName: Record<string, string> = { ON: 'Ontario', BC: 'British Columbia', AB: 'Alberta', QC: 'Quebec' };
  const provFull = provinceName[province] || province;

  const posts = [
    { title: 'Top 10 Tips for First-Time Home Buyers', excerpt: 'Buying your first home is one of the biggest decisions you\'ll make. Here are our top tips to help you navigate the process with confidence.', date: 'March 10, 2026', image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80', category: 'Buying' },
    { title: '2026 Real Estate Market Trends', excerpt: 'The real estate market continues to evolve. Here\'s what buyers and sellers need to know about the current landscape.', date: 'February 28, 2026', image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80', category: 'Market' },
    { title: 'How to Stage Your Home for a Quick Sale', excerpt: 'First impressions matter. Learn how to stage your home to attract more buyers and get top dollar for your property.', date: 'February 15, 2026', image: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=800&q=80', category: 'Selling' },
    { title: 'Best Neighborhoods for Families in Toronto', excerpt: 'Looking for the perfect family neighborhood? We\'ve compiled a list of the top areas in Toronto for families.', date: 'February 1, 2026', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', category: 'Guide' },
    { title: 'Understanding Mortgage Rates in 2026', excerpt: 'Mortgage rates play a crucial role in your home buying journey. Here\'s what you need to know about current rates.', date: 'January 20, 2026', image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80', category: 'Finance' },
    { title: 'Condo vs House: Which is Right for You?', excerpt: 'We break down the pros and cons of condos and houses to help you make the right choice for your lifestyle.', date: 'January 10, 2026', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80', category: 'Guide' },
  ];

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Blog | ${companyName}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet">
  <style>
    *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
    :root { --gold: #C9A96E; --gold-light: #C9A96E33; --gold-mid: #C9A96E88; --dark: #0a0a0f; --dark-2: #13131a; --dark-3: #1c1c26; --white: #ffffff; --off-white: #faf9f7; --gray-100: #f4f3f0; --gray-200: #e8e6e1; --gray-400: #9d9b95; --gray-500: #6b6963; --gray-700: #3a3935; --gray-900: #1a1917; }
    html { scroll-behavior: smooth; }
    body { font-family: 'DM Sans', sans-serif; color: var(--gray-700); background: var(--white); line-height: 1.65; overflow-x: hidden; }
    a { text-decoration: none; color: inherit; }
    img { max-width: 100%; display: block; }
    .container { max-width: 1200px; margin: 0 auto; padding: 0 28px; }
    header { position: fixed; top: 0; left: 0; right: 0; z-index: 1000; background: rgba(255,255,255,0.95); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border-bottom: 1px solid var(--gray-200); transition: all 0.3s ease; }
    .header-inner { display: flex; align-items: center; justify-content: space-between; padding: 16px 0; gap: 24px; }
    .logo-wrap { display: flex; flex-direction: column; }
    .logo-name { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 700; color: var(--gray-900); letter-spacing: -0.3px; line-height: 1; }
    .logo-sub { font-size: 11px; font-weight: 400; color: var(--gold); letter-spacing: 1.5px; text-transform: uppercase; margin-top: 3px; }
    nav { display: flex; align-items: center; gap: 28px; }
    nav a { font-size: 14px; font-weight: 500; color: var(--gray-500); transition: color 0.2s; letter-spacing: 0.2px; }
    nav a:hover { color: var(--gray-900); }
    .header-right { display: flex; align-items: center; gap: 16px; flex-shrink: 0; }
    .header-phone { font-size: 14px; font-weight: 500; color: var(--gray-700); }
    .btn-talk { background: var(--dark); color: var(--white); padding: 10px 22px; border-radius: 6px; font-size: 13px; font-weight: 600; letter-spacing: 0.3px; transition: all 0.25s; white-space: nowrap; }
    .btn-talk:hover { background: var(--gold); color: var(--dark); }
    .page-hero { background: var(--dark); padding: 140px 0 80px; text-align: center; position: relative; overflow: hidden; }
    .page-hero::before { content: ''; position: absolute; inset: 0; background: radial-gradient(ellipse at 50% 0%, var(--gold) 0%, transparent 70%); opacity: 0.1; }
    .page-hero h1 { font-family: 'Playfair Display', serif; font-size: clamp(36px, 5vw, 56px); font-weight: 700; color: var(--white); line-height: 1.12; letter-spacing: -1px; margin-bottom: 18px; position: relative; }
    .page-hero p { font-size: 17px; color: rgba(255,255,255,0.6); max-width: 540px; margin: 0 auto; position: relative; }
    .categories { padding: 32px 0; display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; }
    .category { padding: 8px 20px; border: 1px solid var(--gray-200); border-radius: 24px; font-size: 14px; font-weight: 500; cursor: pointer; transition: all 0.2s; font-family: inherit; background: var(--white); color: var(--gray-500); }
    .category:hover, .category.active { background: var(--gold); color: var(--dark); border-color: var(--gold); }
    .blog-section { padding: 64px 0; }
    .blog-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 28px; }
    .blog-card { background: var(--white); border: 1px solid var(--gray-200); border-radius: 14px; overflow: hidden; transition: all 0.3s; }
    .blog-card:hover { transform: translateY(-6px); box-shadow: 0 16px 32px rgba(0,0,0,0.1); border-color: var(--gold); }
    .blog-img { height: 200px; background-size: cover; background-position: center; }
    .blog-content { padding: 24px; }
    .blog-category { display: inline-block; background: var(--gray-100); color: var(--gray-500); padding: 4px 12px; border-radius: 4px; font-size: 12px; font-weight: 600; margin-bottom: 12px; }
    .blog-title { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 700; color: var(--gray-900); margin-bottom: 12px; line-height: 1.3; }
    .blog-excerpt { font-size: 14px; color: var(--gray-500); margin-bottom: 16px; }
    .blog-meta { display: flex; justify-content: space-between; align-items: center; font-size: 13px; color: var(--gray-400); }
    footer { background: var(--dark); border-top: 1px solid rgba(255,255,255,0.06); padding: 60px 0 36px; }
    .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 48px; margin-bottom: 52px; }
    .footer-brand .logo-name { color: var(--white); font-size: 22px; }
    .footer-brand .logo-sub { color: var(--gold); }
    .footer-brand-desc { font-size: 14px; color: rgba(255,255,255,0.4); line-height: 1.8; margin-top: 16px; max-width: 280px; }
    .footer-col h4 { font-size: 12px; font-weight: 600; letter-spacing: 1.5px; text-transform: uppercase; color: rgba(255,255,255,0.3); margin-bottom: 20px; }
    .footer-col ul { list-style: none; display: flex; flex-direction: column; gap: 10px; }
    .footer-col ul li a { font-size: 14px; color: rgba(255,255,255,0.55); transition: color 0.2s; }
    .footer-col ul li a:hover { color: var(--gold); }
    .footer-contact-item { font-size: 14px; color: rgba(255,255,255,0.55); margin-bottom: 8px; }
    .footer-contact-item a:hover { color: var(--gold); }
    .footer-bottom { border-top: 1px solid rgba(255,255,255,0.06); padding-top: 28px; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px; }
    .footer-copy { font-size: 13px; color: rgba(255,255,255,0.25); }
    .footer-legal { font-size: 12px; color: rgba(255,255,255,0.2); max-width: 500px; text-align: right; }
    @media (max-width: 1024px) { .footer-grid { grid-template-columns: 1fr 1fr; gap: 36px; } }
    @media (max-width: 768px) { nav { display: none; } .page-hero h1 { font-size: 32px; } .blog-grid { grid-template-columns: 1fr; } .footer-grid { grid-template-columns: 1fr; gap: 32px; } .footer-legal { text-align: left; } }
  </style>
</head>
<body>
  <header>
    <div class="container">
      <div class="header-inner">
        <a href="index.html" class="logo-wrap">
          <span class="logo-name">${companyName}</span>
          <span class="logo-sub">Real Estate</span>
        </a>
        <nav>
          <a href="index.html">Home</a>
          <a href="index.html#about">About</a>
          <a href="listings.html">Listings</a>
          <a href="index.html#reviews">Reviews</a>
          <a href="index.html#neighborhoods">Areas</a>
          <a href="blog.html">Blog</a>
          <a href="index.html#resources">Resources</a>
          <a href="index.html#contact">Contact</a>
        </nav>
        <div class="header-right">
          <a href="tel:${phone}" class="header-phone">${phone}</a>
          <a href="index.html#contact" class="btn-talk">Let's Talk</a>
        </div>
      </div>
    </div>
  </header>
  <section class="page-hero">
    <div class="container"><h1>Real Estate Blog</h1><p>Expert insights, tips, and market updates from ${companyName}</p></div>
  </section>
  <section class="categories">
    <div class="container">
      <span class="category active">All Posts</span>
      <span class="category">Buying</span>
      <span class="category">Selling</span>
      <span class="category">Market</span>
      <span class="category">Finance</span>
      <span class="category">Guide</span>
    </div>
  </section>
  <section class="blog-section">
    <div class="container">
      <div class="blog-grid">
        ${posts.map(p => `<div class="blog-card"><div class="blog-img" style="background-image: url('${p.image}')"></div><div class="blog-content"><span class="blog-category">${p.category}</span><div class="blog-title">${p.title}</div><p class="blog-excerpt">${p.excerpt}</p><div class="blog-meta"><span>${p.date}</span><span>Read more →</span></div></div></div>`).join('')}
      </div>
    </div>
  </section>
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
            <li><a href="index.html">Home</a></li>
            <li><a href="index.html#about">About</a></li>
            <li><a href="listings.html">Listings</a></li>
            <li><a href="index.html#reviews">Reviews</a></li>
            <li><a href="index.html#neighborhoods">Areas</a></li>
            <li><a href="blog.html">Blog</a></li>
            <li><a href="index.html#contact">Contact</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Resources</h4>
          <ul>
            <li><a href="index.html#resources">Buyer's Guide</a></li>
            <li><a href="index.html#resources">Seller's Guide</a></li>
            <li><a href="index.html#resources">Market Reports</a></li>
            <li><a href="index.html#resources">Open Houses</a></li>
            <li><a href="index.html#resources">FAQ</a></li>
            <li><a href="index.html#resources">Free Resources</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Get in Touch</h4>
          <div class="footer-contact-item"><a href="tel:${phone}">${phone}</a></div>
          <div class="footer-contact-item"><a href="mailto:${email}">${email}</a></div>
          <div class="footer-contact-item">${city}, ${province}, Canada</div>
        </div>
      </div>
      <div class="footer-bottom">
        <p class="footer-copy">&copy; ${new Date().getFullYear()} ${companyName}. All rights reserved.</p>
        <p class="footer-legal">The trademarks REALTOR&reg;, REALTORS&reg;, and the REALTOR&reg; logo are controlled by The Canadian Real Estate Association (CREA).</p>
      </div>
    </div>
  </footer>
</body>
</html>`;
}

export async function deployToGitHub(
  userId: string,
  siteId: string,
  templateId: string,
  details: Record<string, string>,
  siteName?: string
): Promise<DeployResult> {
  const token = process.env.GITHUB_TOKEN;
  
  if (!token) {
    return { success: false, error: 'GitHub token not configured' };
  }

  const { Octokit } = await import('@octokit/rest');
  const octokit = new Octokit({ auth: token });

  const repoName = siteName 
    ? `webforge-${userId.substring(0, 8)}-${siteName.replace(/[^a-zA-Z0-9]/g, '-')}`.toLowerCase()
    : `webforge-${userId}-${siteId}`.toLowerCase();

  console.log('=== GitHub Pages Deploy ===');
  console.log('Repo:', repoName);

  try {
    const exists = await repoExists(octokit, repoName);

    if (!exists) {
      console.log('Creating repo...');
      await octokit.repos.createInOrg({
        org: ORG,
        name: repoName,
        private: false,
      });
    }

    const html = generateRealEstateHTML(details);
    const listingsHtml = generateListingsPage(details);
    const blogHtml = generateBlogPage(details);

    const files = [
      { path: 'index.html', content: html, message: 'Update index.html' },
      { path: 'listings.html', content: listingsHtml, message: 'Update listings.html' },
      { path: 'blog.html', content: blogHtml, message: 'Update blog.html' },
    ];

    for (const file of files) {
      const content = Buffer.from(file.content).toString('base64');
      try {
        await octokit.repos.getContent({
          owner: ORG,
          repo: repoName,
          path: file.path,
        });
        await octokit.repos.createOrUpdateFileContents({
          owner: ORG,
          repo: repoName,
          path: file.path,
          message: file.message,
          content,
        });
      } catch {
        await octokit.repos.createOrUpdateFileContents({
          owner: ORG,
          repo: repoName,
          path: file.path,
          message: 'Add ' + file.path,
          content,
        });
      }
    }

    try {
      await octokit.repos.createPagesSite({
        owner: ORG,
        repo: repoName,
        source: {
          branch: 'main',
          path: '/',
        },
      });
    } catch (err) {
      console.log('Pages site may already exist');
    }

    const url = `https://${ORG}.github.io/${repoName}/`;
    console.log('Deployed to:', url);
    return { success: true, url };
  } catch (err: any) {
    console.error('GitHub deploy error:', err.message);
    return { success: false, error: err.message };
  }
}

