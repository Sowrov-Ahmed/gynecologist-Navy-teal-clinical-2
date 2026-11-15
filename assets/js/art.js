/* Shared flat inline-SVG artwork (no external images). Owned by the Team Lead. DO NOT EDIT. */
(function () {
  let n = 0;
  const P = {
    pregnancy: { bg: '#E3ECF4', big: '#CDEFF6', sq: '#1E3A6D', off: '#00C4DF', stroke: '#fff', icon: 'heart', label: 'Pregnancy care illustration' },
    delivery: { bg: '#F4F8FB', big: '#DDEBF5', sq: '#12254A', off: '#00C4DF', stroke: '#fff', icon: 'shield', label: 'Safe delivery illustration' },
    pcos: { bg: '#E0F8FC', big: '#BDEBF4', sq: '#1E3A6D', off: '#12254A', stroke: '#fff', icon: 'droplet', label: 'Hormonal health illustration' },
    fertility: { bg: '#1E3A6D', big: '#27478A', sq: '#00C4DF', off: '#FFFFFF', stroke: '#12254A', icon: 'sparkles', label: 'Fertility care illustration' },
    surgery: { bg: '#12254A', big: '#1E3A6D', sq: '#00C4DF', off: '#FFFFFF', stroke: '#12254A', icon: 'scissors', label: 'Laparoscopic surgery illustration' },
    wellness: { bg: '#E3ECF4', big: '#CFE0EE', sq: '#1E3A6D', off: '#00C4DF', stroke: '#fff', icon: 'sun', label: 'Screening and wellness illustration' },
    menopause: { bg: '#F4F8FB', big: '#CDEFF6', sq: '#12254A', off: '#00C4DF', stroke: '#fff', icon: 'moon', label: 'Menopause care illustration' }
  };

  function pattern(cls = 'absolute inset-0 h-full w-full text-navy/10') {
    const id = 'pt' + (++n);
    return `<svg class="${cls}" aria-hidden="true"><defs><pattern id="${id}" width="22" height="22" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.4" fill="currentColor"/></pattern></defs><rect width="100%" height="100%" fill="url(#${id})"/></svg>`;
  }

  function cover(key, cls = 'h-full w-full') {
    const p = P[key] || P.wellness, id = 'ac' + (++n);
    const inner = (window.UI && window.UI.icons[p.icon]) || '';
    const dots = p.bg === '#1E3A6D' || p.bg === '#12254A' ? '#ffffff' : '#1E3A6D';
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice" class="${cls}" role="img" aria-label="${p.label}">
<defs><pattern id="${id}" width="26" height="26" patternUnits="userSpaceOnUse"><circle cx="3" cy="3" r="2" fill="${dots}" fill-opacity=".18"/></pattern></defs>
<rect width="800" height="450" fill="${p.bg}"/>
<rect x="430" y="40" width="330" height="250" fill="url(#${id})"/>
<circle cx="640" cy="330" r="200" fill="${p.big}"/>
<rect x="150" y="105" width="240" height="240" fill="${p.off}"/>
<rect x="124" y="80" width="240" height="240" fill="${p.sq}"/>
<g transform="translate(244 200) scale(7) translate(-12 -12)" fill="none" stroke="${p.stroke}" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round">${inner}</g>
<rect x="470" y="330" width="150" height="14" fill="${p.off}"/><rect x="470" y="360" width="90" height="14" fill="${p.off}" fill-opacity=".55"/>
<path d="M690 70v34M673 87h34" stroke="${p.off}" stroke-width="8"/>
</svg>`;
  }

  const CH = {
    gulshan: { bg: '#E3ECF4', b: '#1E3A6D', label: "Metro Women's & Children's Hospital building" },
    mirpur: { bg: '#E0F8FC', b: '#12254A', label: 'Greenfield Specialized Hospital building' },
    chattogram: { bg: '#F4F8FB', b: '#1E3A6D', label: 'Port City Care Hospital building' }
  };

  function chamber(id, cls = 'h-full w-full') {
    const p = CH[id] || CH.gulshan;
    let win = '';
    for (let r = 0; r < 3; r++) for (let c = 0; c < 5; c++) {
      win += `<rect x="${222 + c * 64}" y="${168 + r * 56}" width="38" height="34" fill="${(r + c) % 3 === 0 ? '#00C4DF' : '#F4F8FB'}" fill-opacity="${(r + c) % 3 === 0 ? '1' : '.9'}"/>`;
    }
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice" class="${cls}" role="img" aria-label="${p.label}">
<rect width="800" height="450" fill="${p.bg}"/>
<circle cx="640" cy="90" r="44" fill="#00C4DF" fill-opacity=".35"/>
<rect x="170" y="120" width="460" height="260" fill="${p.b}"/>
<rect x="150" y="104" width="500" height="26" fill="#12254A"/>
${win}
<rect x="372" y="300" width="56" height="80" fill="#00C4DF"/>
<rect x="352" y="56" width="96" height="48" fill="#00C4DF"/><path d="M400 64v32M384 80h32" stroke="#12254A" stroke-width="9"/>
<rect x="0" y="380" width="800" height="70" fill="#12254A" fill-opacity=".9"/>
<rect x="60" y="300" width="14" height="80" fill="#12254A"/><circle cx="67" cy="290" r="40" fill="#00C4DF" fill-opacity=".6"/>
<rect x="726" y="310" width="14" height="70" fill="#12254A"/><circle cx="733" cy="298" r="36" fill="#00C4DF" fill-opacity=".6"/>
</svg>`;
  }

  window.Art = { cover, chamber, pattern };
})();
