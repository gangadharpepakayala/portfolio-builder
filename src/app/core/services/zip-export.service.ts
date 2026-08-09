import { Injectable } from '@angular/core';
import JSZip from 'jszip';
import saveAs from 'file-saver';
import { PortfolioData, SectionType } from '../models/portfolio.model';

@Injectable({
  providedIn: 'root',
})
export class ZipExportService {
  private getSvgIcon(name: string, size = 18): string {
    const icon = name.toLowerCase();
    if (icon.includes('file') || icon.includes('doc') || icon.includes('resume')) {
      return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>`;
    }
    if (icon.includes('trophy') || icon.includes('award')) {
      return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"/></svg>`;
    }
    if (icon.includes('graduation') || icon.includes('cap') || icon.includes('edu')) {
      return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>`;
    }
    if (icon.includes('cert') || icon.includes('badge')) {
      return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>`;
    }
    if (icon.includes('github')) {
      return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>`;
    }
    if (icon.includes('linkedin')) {
      return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>`;
    }
    if (icon.includes('twitter')) {
      return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>`;
    }
    if (icon.includes('mail') || icon.includes('email')) {
      return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`;
    }
    if (icon.includes('user')) {
      return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`;
    }
    if (icon.includes('check')) {
      return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>`;
    }
    if (icon.includes('link') || icon.includes('external')) {
      return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>`;
    }
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10z"/><path d="M2 12h20"/></svg>`;
  }

  async exportPortfolioZip(portfolio: PortfolioData): Promise<void> {
    const zip = new JSZip();

    // 1. Package uploaded Resume Document into assets/ folder if available
    const assetsFolder = zip.folder('assets');
    let packagedResumePath = '';

    if (portfolio.hero.resumeUrl && portfolio.hero.resumeUrl.startsWith('data:')) {
      const parts = portfolio.hero.resumeUrl.split(',');
      if (parts.length === 2) {
        const base64Data = parts[1];
        const fileName = portfolio.hero.resumeFileName || 'resume.pdf';
        packagedResumePath = `assets/${fileName}`;
        if (assetsFolder) {
          assetsFolder.file(fileName, base64Data, { base64: true });
        }
      }
    } else if (portfolio.hero.resumeUrl) {
      packagedResumePath = portfolio.hero.resumeUrl;
    }

    // 2. Generate index.html with Tailwind CDN for 100% pixel-perfect visual match
    const htmlContent = this.generateHtml(portfolio, packagedResumePath);
    zip.file('index.html', htmlContent);

    // 3. Generate css/style.css
    const cssContent = this.generateStyleCss(portfolio);
    const cssFolder = zip.folder('css');
    if (cssFolder) {
      cssFolder.file('style.css', cssContent);
    }

    // 4. Generate js/script.js
    const jsFolder = zip.folder('js');
    if (jsFolder) {
      jsFolder.file('script.js', this.generateScriptJs());
    }

    // 5. Create assets subfolders
    if (assetsFolder) {
      assetsFolder.folder('images');
      assetsFolder.folder('icons');
    }

    // 6. Generate README.md
    zip.file('README.md', this.generateReadme(portfolio));

    // 7. Generate and trigger download
    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, 'Portfolio.zip');
  }

  private generateHtml(p: PortfolioData, resumePath: string): string {
    const font = p.typography.fontFamily.replace(/\s+/g, '+');
    const sectionsHtml = p.sectionOrder
      .map((secId) => this.renderSectionHtml(secId, p, resumePath))
      .filter((html) => html.trim().length > 0)
      .join('\n\n');

    return `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="${p.hero.name} - ${p.hero.role}" />
  <title>${p.hero.name} | ${p.hero.role}</title>

  <!-- Tailwind CSS Engine -->
  <script src="https://cdn.tailwindcss.com"></script>
  
  <!-- Google Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=${font}:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
  
  <!-- FontAwesome Icons -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />

  <!-- Custom Stylesheet -->
  <link rel="stylesheet" href="css/style.css" />
</head>
<body class="min-h-screen text-slate-100 antialiased" style="font-family: '${p.typography.fontFamily}', sans-serif; background-color: ${p.colors.background};">

  ${p.navbar.visible ? this.renderNavbarHtml(p) : ''}

  <main>
    ${sectionsHtml}
  </main>

  ${p.footer.visible ? this.renderFooterHtml(p) : ''}

  <script src="js/script.js"></script>
</body>
</html>`;
  }

  private renderNavbarHtml(p: PortfolioData): string {
    const n = p.navbar;
    const linksHtml = n.links
      .filter((l) => l.visible)
      .map((l) => `<a href="#${l.sectionId}" class="text-sm font-semibold hover:text-indigo-400 transition-colors" style="color: ${n.menuColor}">${l.label}</a>`)
      .join('\n');

    return `<header class="w-full ${n.isSticky ? 'sticky top-0' : ''} z-50 backdrop-blur-md border-b border-white/5 py-4 px-6" style="background-color: ${n.bgColor || p.colors.navbarBg}">
  <div class="max-w-6xl mx-auto flex items-center justify-between">
    <a href="#" class="text-xl font-extrabold tracking-tight" style="color: ${n.logoColor || p.colors.heading}">${n.logoText}</a>
    <nav class="hidden md:flex items-center gap-8">
      ${linksHtml}
    </nav>
    <button id="navToggle" class="md:hidden p-2 text-slate-200" aria-label="Toggle Navigation">
      <i class="fas fa-bars text-lg"></i>
    </button>
  </div>
  <div id="mobileMenu" class="hidden md:hidden pt-4 pb-2 px-4 space-y-3 border-t border-white/5 mt-3">
    ${linksHtml}
  </div>
</header>`;
  }

  private renderSectionHtml(sectionId: SectionType, p: PortfolioData, resumePath: string): string {
    const colors = p.colors;

    switch (sectionId) {
      case 'hero':
        if (!p.hero.visible) return '';
        const h = p.hero;
        const socialHtml = h.socialLinks
          .map(
            (s) =>
              `<a href="${s.url}" target="_blank" rel="noopener" class="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center transition-all hover:scale-110" style="background-color: ${colors.cardBg}; color: ${colors.primary};" title="${s.platform}">
                ${this.getSvgIcon(s.icon, 18)}
              </a>`
          )
          .join('\n');

        const primaryTargetHref = resumePath || h.ctaPrimaryUrl || '#';
        const isResumeDownload = primaryTargetHref.includes('resume') || primaryTargetHref.endsWith('.pdf');

        return `<section id="hero" class="w-full relative py-24 sm:py-32 px-6 flex flex-col justify-center overflow-hidden border-b border-white/5" style="background-color: ${colors.background};">
  <div class="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
    <div class="space-y-6 ${h.profileImage ? 'lg:col-span-7' : 'lg:col-span-12'} ${h.alignment === 'center' ? 'text-center' : h.alignment === 'right' ? 'text-right' : 'text-left'}">
      <div class="space-y-3">
        <h1 class="text-4xl sm:text-6xl font-black tracking-tight leading-tight" style="color: ${h.nameColor || colors.heading}">${h.name}</h1>
        <h2 class="text-xl sm:text-2xl font-bold tracking-wide" style="color: ${h.roleColor || colors.primary}">${h.role}</h2>
      </div>

      <p class="text-base sm:text-lg max-w-2xl leading-relaxed font-medium ${h.alignment === 'center' ? 'mx-auto' : h.alignment === 'right' ? 'ml-auto' : ''}" style="color: ${h.descColor || colors.text}">${h.description}</p>

      <div class="flex flex-wrap items-center gap-4 pt-4 ${h.alignment === 'center' ? 'justify-center' : h.alignment === 'right' ? 'justify-end' : ''}">
        ${h.ctaPrimaryLabel ? `<a href="${primaryTargetHref}" ${isResumeDownload ? `download="${h.resumeFileName || 'Resume.pdf'}"` : ''} class="px-6 py-3.5 rounded-xl font-extrabold text-sm text-white shadow-xl transition-all hover:scale-105 inline-flex items-center gap-2" style="background-color: ${colors.button};">
          ${this.getSvgIcon('file', 18)}
          <span>${h.ctaPrimaryLabel}</span>
        </a>` : ''}
        ${h.ctaSecondaryLabel ? `<a href="${h.ctaSecondaryUrl}" class="px-6 py-3.5 rounded-xl font-bold text-sm border transition-all hover:scale-105" style="border-color: ${colors.borderColor}; color: ${colors.heading};">${h.ctaSecondaryLabel}</a>` : ''}
      </div>

      ${socialHtml ? `<div class="flex items-center gap-3 pt-6 border-t border-white/5 ${h.alignment === 'center' ? 'justify-center' : h.alignment === 'right' ? 'justify-end' : ''}">${socialHtml}</div>` : ''}
    </div>

    ${
      h.profileImage
        ? `<div class="lg:col-span-5 flex justify-center">
      <img src="${h.profileImage}" alt="${h.name}" class="w-64 h-64 sm:w-80 sm:h-80 object-cover shadow-2xl ${h.imageShape === 'circle' ? 'rounded-full' : h.imageShape === 'square' ? 'rounded-none' : 'rounded-2xl'} ${h.imageBorder ? 'border-4' : ''}" style="border-color: ${colors.primary};" />
    </div>`
        : ''
    }
  </div>
</section>`;

      case 'about':
        if (!p.about.visible) return '';
        const ab = p.about;
        const customDetails = ab.customDetails && ab.customDetails.length > 0 ? ab.customDetails : [];

        const highlightsHtml = ab.highlights?.length
          ? `<div class="space-y-3 pt-5 border-t border-white/5 mt-2">
              <span class="text-[11px] font-extrabold uppercase tracking-widest text-indigo-400">KEY HIGHLIGHTS</span>
              <div class="space-y-2.5">
                ${ab.highlights.map((h) => `<div class="flex items-start gap-2.5 text-xs sm:text-sm font-semibold" style="color: ${colors.heading};"><span class="text-indigo-400 shrink-0 mt-0.5">${this.getSvgIcon('check', 16)}</span> <span>${h}</span></div>`).join('')}
              </div>
            </div>`
          : '';

        const detailsGridHtml = customDetails.length > 0
          ? `<div class="lg:col-span-5 flex flex-col">
              <div class="rounded-2xl border p-6 sm:p-8 space-y-6 shadow-xl h-full flex flex-col justify-start backdrop-blur-sm" style="background-color: ${colors.cardBg}; border-color: ${colors.borderColor};">
                <div class="flex items-center justify-between pb-3 border-b border-white/5">
                  <div class="flex items-center gap-2">
                    <span class="text-indigo-400">${this.getSvgIcon('user', 16)}</span>
                    <h3 class="text-xs font-extrabold uppercase tracking-wider" style="color: ${colors.primary};">PERSONAL DETAILS</h3>
                  </div>
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                  ${customDetails.map((item) => `
                    <div class="p-3 rounded-xl bg-slate-950/40 border border-white/5 space-y-0.5 ${item.value.length > 25 ? 'sm:col-span-2' : ''}">
                      <div class="text-[10px] font-bold text-slate-400 uppercase tracking-wide">${item.label}</div>
                      ${item.value.includes('@') ? `<a href="mailto:${item.value}" class="text-xs font-bold font-mono hover:underline truncate block" style="color: ${colors.primary};">${item.value}</a>` : item.label.toLowerCase().includes('freelance') || item.label.toLowerCase().includes('status') ? `<div class="inline-flex items-center gap-1.5 text-xs font-extrabold text-emerald-400 mt-0.5"><span class="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></span><span>${item.value}</span></div>` : `<div class="text-xs font-extrabold truncate" style="color: ${colors.heading};">${item.value}</div>`}
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>`
          : '';

        const activeMetricsCount = (ab.experienceYears ? 1 : 0) + (ab.projectsCount ? 1 : 0) + (ab.clientsCount ? 1 : 0);
        const statsHtml = activeMetricsCount > 0
          ? `<div class="grid gap-6 pt-4 grid-cols-1 sm:grid-cols-${activeMetricsCount}">
              ${ab.experienceYears ? `<div class="p-5 rounded-2xl border text-center space-y-1 shadow-lg" style="background-color: ${colors.cardBg}; border-color: ${colors.borderColor};"><div class="text-2xl sm:text-3xl font-extrabold" style="color: ${colors.primary};">${ab.experienceYears}</div><div class="text-xs font-bold text-slate-400 uppercase tracking-wide">Years Experience</div></div>` : ''}
              ${ab.projectsCount ? `<div class="p-5 rounded-2xl border text-center space-y-1 shadow-lg" style="background-color: ${colors.cardBg}; border-color: ${colors.borderColor};"><div class="text-2xl sm:text-3xl font-extrabold" style="color: ${colors.primary};">${ab.projectsCount}</div><div class="text-xs font-bold text-slate-400 uppercase tracking-wide">Projects Completed</div></div>` : ''}
              ${ab.clientsCount ? `<div class="p-5 rounded-2xl border text-center space-y-1 shadow-lg" style="background-color: ${colors.cardBg}; border-color: ${colors.borderColor};"><div class="text-2xl sm:text-3xl font-extrabold" style="color: ${colors.primary};">${ab.clientsCount}</div><div class="text-xs font-bold text-slate-400 uppercase tracking-wide">Happy Clients</div></div>` : ''}
            </div>`
          : '';

        return `<section id="about" class="w-full py-20 px-6 border-t border-white/5" style="background-color: ${ab.bgColor || colors.sectionBg};">
  <div class="max-w-6xl mx-auto space-y-10">
    <div class="text-center space-y-2">
      <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-extrabold uppercase tracking-widest text-indigo-400">
        <span>WHO I AM</span>
      </div>
      <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight" style="color: ${ab.titleColor || colors.heading};">${ab.title}</h2>
      <p class="text-xs sm:text-sm max-w-xl mx-auto font-medium" style="color: ${ab.subtitleColor || colors.text};">${ab.subtitle}</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
      <div class="rounded-2xl border p-6 sm:p-8 flex flex-col justify-start space-y-6 shadow-xl backdrop-blur-sm h-full ${customDetails.length > 0 || ab.image ? 'lg:col-span-7' : 'lg:col-span-12'}" style="background-color: ${colors.cardBg}; border-color: ${colors.borderColor};">
        <div class="space-y-4">
          <div class="flex items-center gap-2">
            <span class="w-2 h-6 rounded-full bg-gradient-to-b from-indigo-500 to-pink-500"></span>
            <h3 class="text-xs font-extrabold uppercase tracking-wider" style="color: ${colors.primary};">BIOGRAPHY & OVERVIEW</h3>
          </div>
          <p class="text-sm sm:text-base leading-relaxed font-normal" style="color: ${colors.text};">${ab.description}</p>
        </div>

        ${ab.image ? `<div class="pt-2"><img src="${ab.image}" alt="About" class="w-full h-48 sm:h-56 object-cover rounded-xl border border-white/10" /></div>` : ''}
        ${highlightsHtml}
      </div>

      ${detailsGridHtml}
    </div>

    ${statsHtml}
  </div>
</section>`;

      case 'skills':
        if (!p.skills.visible) return '';
        const sk = p.skills;
        const skillsHtml = sk.skills
          .map(
            (item) => `<div class="p-5 rounded-2xl border space-y-3 shadow-md" style="background-color: ${colors.cardBg}; border-color: ${colors.borderColor};">
        <div class="flex items-center justify-between text-xs font-bold">
          <span style="color: ${colors.heading};">${item.name}</span>
          <span style="color: ${colors.primary};">${item.percentage}%</span>
        </div>
        <div class="w-full h-2 rounded-full overflow-hidden bg-slate-950/60">
          <div class="h-full rounded-full" style="width: ${item.percentage}%; background-color: ${item.color || colors.primary};"></div>
        </div>
      </div>`
          )
          .join('\n');

        return `<section id="skills" class="w-full py-20 px-6 border-t border-white/5" style="background-color: ${sk.bgColor || colors.background};">
  <div class="max-w-6xl mx-auto space-y-12">
    <div class="text-center space-y-2">
      <h2 class="text-3xl sm:text-4xl font-extrabold" style="color: ${sk.titleColor || colors.heading};">${sk.title}</h2>
      <p class="text-sm sm:text-base max-w-xl mx-auto" style="color: ${colors.text};">${sk.subtitle}</p>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      ${skillsHtml}
    </div>
  </div>
</section>`;

      case 'experience':
        if (!p.experience.visible) return '';
        const ex = p.experience;
        const timelineHtml = ex.experiences
          .map(
            (item) => `<div class="p-6 sm:p-8 rounded-2xl border space-y-4 shadow-xl" style="background-color: ${colors.cardBg}; border-color: ${colors.borderColor};">
        <div class="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-4">
          <div>
            <h3 class="text-xl font-bold" style="color: ${colors.heading};">${item.role}</h3>
            <h4 class="text-sm font-semibold" style="color: ${colors.primary};">${item.company} &bull; ${item.location}</h4>
          </div>
          <span class="text-xs font-bold px-3 py-1 rounded-full bg-white/5" style="color: ${colors.text};">${item.duration}</span>
        </div>
        <p class="text-sm leading-relaxed" style="color: ${colors.text};">${item.description}</p>
        <div class="flex flex-wrap gap-1.5 pt-2">
          ${item.technologies.map((t) => `<span class="text-[10px] px-2.5 py-1 rounded font-semibold bg-white/5" style="color: ${colors.primary};">${t}</span>`).join('')}
        </div>
      </div>`
          )
          .join('\n');

        return `<section id="experience" class="w-full py-20 px-6 border-t border-white/5" style="background-color: ${ex.bgColor || colors.sectionBg};">
  <div class="max-w-4xl mx-auto space-y-12">
    <div class="text-center space-y-2">
      <h2 class="text-3xl sm:text-4xl font-extrabold" style="color: ${ex.titleColor || colors.heading};">${ex.title}</h2>
      <p class="text-sm sm:text-base max-w-xl mx-auto" style="color: ${colors.text};">${ex.subtitle}</p>
    </div>
    <div class="space-y-6">
      ${timelineHtml}
    </div>
  </div>
</section>`;

      case 'projects':
        if (!p.projects.visible) return '';
        const pr = p.projects;
        const projectsHtml = pr.projects
          .map(
            (item) => `<div class="rounded-2xl border overflow-hidden shadow-xl flex flex-col" style="background-color: ${colors.cardBg}; border-color: ${colors.borderColor};">
        <div class="h-48 overflow-hidden relative">
          <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover" />
        </div>
        <div class="p-6 flex-1 flex flex-col justify-between space-y-4">
          <div class="space-y-2">
            <h3 class="text-xl font-bold" style="color: ${colors.heading};">${item.title}</h3>
            <p class="text-xs sm:text-sm line-clamp-3 leading-relaxed" style="color: ${colors.text};">${item.description}</p>
          </div>
          <div class="space-y-4 pt-2">
            <div class="flex flex-wrap gap-1.5">
              ${item.tags.map((t) => `<span class="text-[10px] px-2 py-0.5 rounded font-semibold bg-white/5" style="color: ${colors.primary};">${t}</span>`).join('')}
            </div>
            <div class="flex items-center gap-3 pt-2 border-t border-white/5">
              ${item.liveDemoUrl ? `<a href="${item.liveDemoUrl}" target="_blank" class="flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg text-white" style="background-color: ${colors.button};">Live Demo</a>` : ''}
              ${item.githubUrl ? `<a href="${item.githubUrl}" target="_blank" class="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border" style="border-color: ${colors.borderColor}; color: ${colors.heading};">GitHub</a>` : ''}
            </div>
          </div>
        </div>
      </div>`
          )
          .join('\n');

        return `<section id="projects" class="w-full py-20 px-6 border-t border-white/5" style="background-color: ${pr.bgColor || colors.background};">
  <div class="max-w-6xl mx-auto space-y-12">
    <div class="text-center space-y-2">
      <h2 class="text-3xl sm:text-4xl font-extrabold" style="color: ${pr.titleColor || colors.heading};">${pr.title}</h2>
      <p class="text-sm sm:text-base max-w-xl mx-auto" style="color: ${colors.text};">${pr.subtitle}</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      ${projectsHtml}
    </div>
  </div>
</section>`;

      case 'education':
        if (!p.education.visible) return '';
        const ed = p.education;
        const filteredEduItems = ed.items.filter(
          (item) =>
            !item.degree.toLowerCase().includes('aws') &&
            !item.college.toLowerCase().includes('amazon')
        );
        const eduHtml = filteredEduItems
          .map(
            (item) => `<div class="w-full sm:w-[calc(50%-16px)] max-w-[580px] p-6 rounded-2xl border space-y-4 shadow-md flex flex-col justify-between" style="background-color: ${colors.cardBg}; border-color: ${colors.borderColor};">
        <div class="space-y-3">
          <div class="flex items-start gap-3.5">
            <div class="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center shrink-0 border border-indigo-500/20 text-indigo-400 mt-0.5">
              ${this.getSvgIcon('education', 20)}
            </div>
            <div class="space-y-1">
              <h3 class="text-base sm:text-lg font-bold leading-snug" style="color: ${colors.heading};">${item.degree}</h3>
              <h4 class="text-xs font-semibold" style="color: ${colors.primary};">${item.college}</h4>
            </div>
          </div>

          <span class="text-xs font-bold px-2.5 py-1 rounded-full bg-white/5 font-mono text-slate-300 inline-block">${item.duration} &bull; ${item.grade}</span>
          <p class="text-xs text-slate-300 leading-relaxed">${item.description}</p>
        </div>
      </div>`
          )
          .join('\n');

        return `<section id="education" class="w-full py-20 px-6 border-t border-white/5" style="background-color: ${ed.bgColor || colors.sectionBg};">
  <div class="max-w-6xl mx-auto space-y-12">
    <div class="text-center space-y-2">
      <h2 class="text-3xl sm:text-4xl font-extrabold" style="color: ${ed.titleColor || colors.heading};">${ed.title}</h2>
      <p class="text-xs sm:text-sm max-w-xl mx-auto font-medium" style="color: ${colors.text};">${ed.subtitle}</p>
    </div>
    <div class="flex flex-wrap justify-center gap-6">
      ${eduHtml}
    </div>
  </div>
</section>`;

      case 'certifications':
        if (!p.certifications?.visible) return '';
        const cr = p.certifications;
        const certHtml = cr.certifications
          .map(
            (item) => `<div class="w-full sm:w-[calc(50%-16px)] max-w-[580px] p-6 rounded-2xl border space-y-4 shadow-md flex flex-col justify-between" style="background-color: ${colors.cardBg}; border-color: ${colors.borderColor};">
        <div class="space-y-3">
          <div class="flex items-start justify-between gap-3">
            <div class="flex items-start gap-3.5">
              <div class="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center shrink-0 border border-indigo-500/20 text-indigo-400 mt-0.5">
                ${this.getSvgIcon('cert', 20)}
              </div>
              <div class="space-y-1">
                <h3 class="text-base sm:text-lg font-bold leading-snug" style="color: ${colors.heading};">${item.title}</h3>
                <h4 class="text-xs font-semibold" style="color: ${colors.primary};">${item.issuer}</h4>
              </div>
            </div>
            ${item.issueDate ? `<span class="text-xs font-bold px-2.5 py-1 rounded-full bg-white/5 font-mono text-slate-300 shrink-0">${item.issueDate}</span>` : ''}
          </div>

          ${item.description ? `<p class="text-xs text-slate-300 leading-relaxed">${item.description}</p>` : ''}
        </div>
        ${item.credentialId || item.credentialUrl ? `<div class="pt-3 border-t border-white/5 space-y-2">
          ${item.credentialId ? `<div class="text-[11px] font-mono text-slate-400 truncate">ID: <span class="text-slate-200">${item.credentialId}</span></div>` : ''}
          ${item.credentialUrl ? `<a href="${item.credentialUrl}" target="_blank" rel="noopener" class="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-400 hover:underline"><span>Verify Credential</span> ${this.getSvgIcon('link', 12)}</a>` : ''}
        </div>` : ''}
      </div>`
          )
          .join('\n');

        return `<section id="certifications" class="w-full py-20 px-6 border-t border-white/5" style="background-color: ${cr.bgColor || colors.background};">
  <div class="max-w-6xl mx-auto space-y-12">
    <div class="text-center space-y-2">
      <h2 class="text-3xl sm:text-4xl font-extrabold" style="color: ${cr.titleColor || colors.heading};">${cr.title}</h2>
      <p class="text-xs sm:text-sm max-w-xl mx-auto font-medium" style="color: ${colors.text};">${cr.subtitle}</p>
    </div>
    <div class="flex flex-wrap justify-center gap-6">
      ${certHtml}
    </div>
  </div>
</section>`;

      case 'achievements':
        if (!p.achievements.visible) return '';
        const ac = p.achievements;
        const achHtml = ac.achievements
          .map(
            (item) => `<div class="w-full sm:w-[calc(50%-16px)] max-w-[580px] p-6 rounded-2xl border space-y-4 shadow-md flex flex-col justify-between" style="background-color: ${colors.cardBg}; border-color: ${colors.borderColor};">
        <div class="space-y-3">
          <div class="flex items-start gap-3.5">
            <div class="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center shrink-0 border border-indigo-500/20 text-indigo-400 mt-0.5">
              ${this.getSvgIcon('trophy', 20)}
            </div>
            <div class="space-y-1">
              <h3 class="text-base sm:text-lg font-bold leading-snug" style="color: ${colors.heading};">${item.title}</h3>
              <h4 class="text-xs font-semibold" style="color: ${colors.primary};">${item.issuer} (${item.year})</h4>
            </div>
          </div>
          <p class="text-xs text-slate-300 leading-relaxed">${item.description}</p>
        </div>
      </div>`
          )
          .join('\n');

        return `<section id="achievements" class="w-full py-20 px-6 border-t border-white/5" style="background-color: ${ac.bgColor || colors.background};">
  <div class="max-w-6xl mx-auto space-y-12">
    <div class="text-center space-y-2">
      <h2 class="text-3xl sm:text-4xl font-extrabold" style="color: ${ac.titleColor || colors.heading};">${ac.title}</h2>
      <p class="text-xs sm:text-sm max-w-xl mx-auto font-medium" style="color: ${colors.text};">${ac.subtitle}</p>
    </div>
    <div class="flex flex-wrap justify-center gap-6">
      ${achHtml}
    </div>
  </div>
</section>`;

      case 'testimonials':
        if (!p.testimonials.visible) return '';
        const tm = p.testimonials;
        const testHtml = tm.testimonials
          .map(
            (item) => `<div class="p-6 rounded-2xl border space-y-4 shadow-md flex flex-col justify-between" style="background-color: ${colors.cardBg}; border-color: ${colors.borderColor};">
        <p class="text-sm italic leading-relaxed" style="color: ${colors.text};">"${item.content}"</p>
        <div class="flex items-center gap-3 pt-3 border-t border-white/5">
          ${item.avatar ? `<img src="${item.avatar}" alt="${item.name}" class="w-10 h-10 rounded-full object-cover border border-white/10" />` : ''}
          <div>
            <h4 class="text-xs font-bold" style="color: ${colors.heading};">${item.name}</h4>
            <p class="text-[11px] text-slate-400">${item.role}, ${item.company}</p>
          </div>
        </div>
      </div>`
          )
          .join('\n');

        return `<section id="testimonials" class="w-full py-20 px-6 border-t border-white/5" style="background-color: ${tm.bgColor || colors.sectionBg};">
  <div class="max-w-6xl mx-auto space-y-12">
    <div class="text-center space-y-2">
      <h2 class="text-3xl sm:text-4xl font-extrabold" style="color: ${tm.titleColor || colors.heading};">${tm.title}</h2>
      <p class="text-sm sm:text-base max-w-xl mx-auto" style="color: ${colors.text};">${tm.subtitle}</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      ${testHtml}
    </div>
  </div>
</section>`;

      case 'contact':
        if (!p.contact.visible) return '';
        const ct = p.contact;
        return `<section id="contact" class="w-full py-20 px-6 border-t border-white/5" style="background-color: ${ct.bgColor || colors.background};">
  <div class="max-w-6xl mx-auto space-y-12">
    <div class="text-center space-y-2">
      <h2 class="text-3xl sm:text-4xl font-extrabold" style="color: ${ct.titleColor || colors.heading};">${ct.title}</h2>
      <p class="text-sm sm:text-base max-w-xl mx-auto" style="color: ${colors.text};">${ct.subtitle}</p>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div class="lg:col-span-5 p-6 rounded-2xl border space-y-4" style="background-color: ${colors.cardBg}; border-color: ${colors.borderColor};">
        <div class="flex items-center gap-3 text-sm"><span class="text-indigo-400">${this.getSvgIcon('mail', 18)}</span> <div><strong style="color: ${colors.heading};">Email:</strong> ${ct.email}</div></div>
        <div class="flex items-center gap-3 text-sm"><span class="text-indigo-400">${this.getSvgIcon('globe', 18)}</span> <div><strong style="color: ${colors.heading};">Phone:</strong> ${ct.phone}</div></div>
        <div class="flex items-center gap-3 text-sm"><span class="text-indigo-400">${this.getSvgIcon('user', 18)}</span> <div><strong style="color: ${colors.heading};">Address:</strong> ${ct.address}</div></div>
        <div class="flex items-center gap-3 text-sm"><span class="text-indigo-400">${this.getSvgIcon('globe', 18)}</span> <div><strong style="color: ${colors.heading};">Website:</strong> ${ct.website}</div></div>
      </div>
      <form class="lg:col-span-7 space-y-4 p-6 rounded-2xl border" style="background-color: ${colors.cardBg}; border-color: ${colors.borderColor};" id="contactForm">
        <input type="text" placeholder="Your Name" required class="w-full bg-slate-950 border border-slate-800 text-sm font-semibold rounded-xl p-3 text-slate-100" />
        <input type="email" placeholder="Your Email" required class="w-full bg-slate-950 border border-slate-800 text-sm font-semibold rounded-xl p-3 text-slate-100" />
        <textarea placeholder="Your Message" rows="4" required class="w-full bg-slate-950 border border-slate-800 text-sm font-semibold rounded-xl p-3 text-slate-100"></textarea>
        <button type="submit" class="px-6 py-3 rounded-xl font-bold text-sm text-white" style="background-color: ${colors.button};">Send Message</button>
      </form>
    </div>
  </div>
</section>`;

      default:
        return '';
    }
  }

  private renderFooterHtml(p: PortfolioData): string {
    const ft = p.footer;
    return `<footer class="w-full py-8 px-6 text-center border-t border-white/5" style="background-color: ${ft.bgColor}; color: ${ft.textColor};">
  <div class="max-w-6xl mx-auto">
    <p class="text-xs font-semibold">${ft.copyrightText}</p>
  </div>
</footer>`;
  }

  private generateStyleCss(p: PortfolioData): string {
    const c = p.colors;
    return `:root {
  --primary-color: ${c.primary};
  --secondary-color: ${c.secondary};
  --accent-color: ${c.accent};
  --bg-color: ${c.background};
  --section-bg: ${c.sectionBg};
  --text-color: ${c.text};
  --heading-color: ${c.heading};
  --link-color: ${c.link};
  --button-bg: ${c.button};
  --button-hover: ${c.buttonHover};
  --card-bg: ${c.cardBg};
  --border-color: ${c.borderColor};
  --footer-bg: ${c.footerBg};
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: ${c.background};
}
::-webkit-scrollbar-thumb {
  background: ${c.borderColor};
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: ${c.primary};
}
`;
  }

  private generateScriptJs(): string {
    return `document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav Toggle
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Smooth Scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
        if (mobileMenu) mobileMenu.classList.add('hidden');
      }
    });
  });

  // Contact Form submit handler
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Thank you for reaching out! Your message has been sent successfully.');
      contactForm.reset();
    });
  }
});`;
  }

  private generateReadme(p: PortfolioData): string {
    return `# ${p.hero.name} - Personal Portfolio Website

This static portfolio website was created and generated using **Portfolio Builder**.

## 📁 Package Contents
- \`index.html\`: Complete semantic HTML5 webpage matching 100% of the live design.
- \`css/style.css\`: Customized CSS design variables & custom scrollbar styles.
- \`js/script.js\`: Vanilla JavaScript for navigation menu toggle & smooth scroll interactions.
- \`assets/\`: Directory structure for images and uploaded resume document.

## 🚀 How to Host & Deploy

### Option 1: Netlify / Vercel (Free & Instant)
1. Sign in to [Netlify](https://netlify.com) or [Vercel](https://vercel.com).
2. Drag and drop this extracted folder directly into the Netlify/Vercel dashboard.
3. Your site will be deployed instantly with a custom live URL and SSL certificate!

### Option 2: GitHub Pages (Free)
1. Create a new GitHub repository.
2. Push the extracted contents of this ZIP file to your repository.
3. In GitHub repo settings, navigate to **Pages** -> Set Source to **Branch: main** / **Root (/)**.
4. Click Save. Your website will be live in 1-2 minutes!

---
*Generated by Portfolio Builder*
`;
  }
}
