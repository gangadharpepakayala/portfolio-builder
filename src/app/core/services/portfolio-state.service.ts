import { Injectable, signal, computed, effect } from '@angular/core';
import {
  PortfolioData,
  ThemePresetKey,
  ColorSettings,
  TypographySettings,
  LayoutSettings,
  NavbarSection,
  HeroSection,
  AboutSection,
  SkillsSection,
  ExperienceSection,
  ProjectsSection,
  EducationSection,
  CertificationsSection,
  AchievementsSection,
  TestimonialsSection,
  ContactSection,
  FooterSection,
  SectionType,
} from '../models/portfolio.model';
import { DEFAULT_PORTFOLIO_DATA } from '../constants/default-portfolio.data';
import { THEME_PRESETS } from '../constants/theme-presets.data';

const STORAGE_KEY = 'portfolio_builder_v1_state';

@Injectable({
  providedIn: 'root',
})
export class PortfolioStateService {
  // Main signals
  readonly portfolio = signal<PortfolioData>(this.loadInitialState());
  readonly selectedSectionId = signal<string | null>('hero');
  readonly selectedItemId = signal<string | null>(null);
  readonly activeTab = signal<'theme' | 'typography' | 'images' | 'sections' | 'layout' | 'export'>('theme');
  readonly previewMode = signal<boolean>(false);

  // Undo/Redo stacks tracked with signals for reactive updates
  private readonly pastStack = signal<PortfolioData[]>([]);
  private readonly futureStack = signal<PortfolioData[]>([]);

  readonly canUndo = computed(() => this.pastStack().length > 0);
  readonly canRedo = computed(() => this.futureStack().length > 0);

  constructor() {
    // Sync state to LocalStorage automatically whenever portfolio changes
    effect(() => {
      const data = this.portfolio();
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch (err) {
        console.error('Failed to save portfolio state to LocalStorage:', err);
      }
    });

    // Auto-update dynamic Google Fonts link tag in DOM
    effect(() => {
      const font = this.portfolio().typography.fontFamily;
      this.loadGoogleFont(font);
    });
  }

  private loadInitialState(): PortfolioData {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        const state: PortfolioData = {
          ...DEFAULT_PORTFOLIO_DATA,
          ...parsed,
          colors: { ...DEFAULT_PORTFOLIO_DATA.colors, ...(parsed.colors || {}) },
          typography: { ...DEFAULT_PORTFOLIO_DATA.typography, ...(parsed.typography || {}) },
          layout: { ...DEFAULT_PORTFOLIO_DATA.layout, ...(parsed.layout || {}) },
          about: { ...DEFAULT_PORTFOLIO_DATA.about, ...(parsed.about || {}) },
          hero: { ...DEFAULT_PORTFOLIO_DATA.hero, ...(parsed.hero || {}) },
          education: { ...DEFAULT_PORTFOLIO_DATA.education, ...(parsed.education || {}) },
          certifications: { ...DEFAULT_PORTFOLIO_DATA.certifications, ...(parsed.certifications || {}) },
        };
        // Migrate hero primary button to Resume
        if (
          state.hero.ctaPrimaryLabel === 'Download Resume' ||
          state.hero.ctaPrimaryLabel === 'Explore Projects' ||
          !state.hero.ctaPrimaryLabel
        ) {
          state.hero.ctaPrimaryLabel = 'Resume';
        }
        // Migrate education section title & remove AWS cert from education items if present
        if (state.education) {
          if (state.education.title && state.education.title.includes('& Certifications')) {
            state.education.title = 'Education';
            state.education.subtitle = 'Academic background and degree credentials';
          }
          if (state.education.items) {
            state.education.items = state.education.items.filter(
              (item) =>
                !item.degree.toLowerCase().includes('aws') &&
                !item.college.toLowerCase().includes('amazon')
            );
          }
        }
        // Migrate customDetails if missing or empty
        if (!state.about.customDetails || state.about.customDetails.length === 0) {
          state.about.customDetails = JSON.parse(JSON.stringify(DEFAULT_PORTFOLIO_DATA.about.customDetails));
        }
        // Ensure certifications section exists in sectionOrder
        if (!state.sectionOrder.includes('certifications')) {
          const eduIndex = state.sectionOrder.indexOf('education');
          if (eduIndex !== -1) {
            state.sectionOrder.splice(eduIndex + 1, 0, 'certifications');
          } else {
            state.sectionOrder.push('certifications');
          }
        }
        return state;
      }
    } catch (e) {
      console.warn('Error restoring state from LocalStorage, falling back to default data:', e);
    }
    return JSON.parse(JSON.stringify(DEFAULT_PORTFOLIO_DATA));
  }

  private pushHistoryState() {
    const current = JSON.parse(JSON.stringify(this.portfolio()));
    const past = [...this.pastStack(), current];
    if (past.length > 30) {
      past.shift();
    }
    this.pastStack.set(past);
    this.futureStack.set([]);
  }

  private loadGoogleFont(fontName: string) {
    if (typeof document === 'undefined') return;
    const formattedFont = fontName.replace(/\s+/g, '+');
    let linkElement = document.getElementById('dynamic-google-font-link') as HTMLLinkElement;
    if (!linkElement) {
      linkElement = document.createElement('link');
      linkElement.id = 'dynamic-google-font-link';
      linkElement.rel = 'stylesheet';
      document.head.appendChild(linkElement);
    }
    linkElement.href = `https://fonts.googleapis.com/css2?family=${formattedFont}:wght@300;400;500;600;700;800&display=swap`;
  }

  // --- Core Mutation Handlers ---

  updateState(updater: (draft: PortfolioData) => PortfolioData) {
    this.pushHistoryState();
    const nextState = updater(JSON.parse(JSON.stringify(this.portfolio())));
    this.portfolio.set(nextState);
  }

  applyThemePreset(themeKey: ThemePresetKey) {
    const preset = THEME_PRESETS[themeKey];
    if (!preset) return;
    this.updateState((draft) => ({
      ...draft,
      themePreset: themeKey,
      colors: { ...preset.colors },
    }));
  }

  updateColors(colorsPartial: Partial<ColorSettings>) {
    this.updateState((draft) => ({
      ...draft,
      colors: { ...draft.colors, ...colorsPartial },
    }));
  }

  updateTypography(typographyPartial: Partial<TypographySettings>) {
    this.updateState((draft) => ({
      ...draft,
      typography: { ...draft.typography, ...typographyPartial },
    }));
  }

  updateLayout(layoutPartial: Partial<LayoutSettings>) {
    this.updateState((draft) => ({
      ...draft,
      layout: { ...draft.layout, ...layoutPartial },
    }));
  }

  updateNavbar(navbarPartial: Partial<NavbarSection>) {
    this.updateState((draft) => ({
      ...draft,
      navbar: { ...draft.navbar, ...navbarPartial },
    }));
  }

  updateHero(heroPartial: Partial<HeroSection>) {
    this.updateState((draft) => ({
      ...draft,
      hero: { ...draft.hero, ...heroPartial },
    }));
  }

  updateAbout(aboutPartial: Partial<AboutSection>) {
    this.updateState((draft) => ({
      ...draft,
      about: { ...draft.about, ...aboutPartial },
    }));
  }

  updateSkills(skillsPartial: Partial<SkillsSection>) {
    this.updateState((draft) => ({
      ...draft,
      skills: { ...draft.skills, ...skillsPartial },
    }));
  }

  updateExperience(experiencePartial: Partial<ExperienceSection>) {
    this.updateState((draft) => ({
      ...draft,
      experience: { ...draft.experience, ...experiencePartial },
    }));
  }

  updateProjects(projectsPartial: Partial<ProjectsSection>) {
    this.updateState((draft) => ({
      ...draft,
      projects: { ...draft.projects, ...projectsPartial },
    }));
  }

  updateEducation(educationPartial: Partial<EducationSection>) {
    this.updateState((draft) => ({
      ...draft,
      education: { ...draft.education, ...educationPartial },
    }));
  }

  updateCertifications(certificationsPartial: Partial<CertificationsSection>) {
    this.updateState((draft) => ({
      ...draft,
      certifications: { ...draft.certifications, ...certificationsPartial },
    }));
  }

  updateAchievements(achievementsPartial: Partial<AchievementsSection>) {
    this.updateState((draft) => ({
      ...draft,
      achievements: { ...draft.achievements, ...achievementsPartial },
    }));
  }

  updateTestimonials(testimonialsPartial: Partial<TestimonialsSection>) {
    this.updateState((draft) => ({
      ...draft,
      testimonials: { ...draft.testimonials, ...testimonialsPartial },
    }));
  }

  updateContact(contactPartial: Partial<ContactSection>) {
    this.updateState((draft) => ({
      ...draft,
      contact: { ...draft.contact, ...contactPartial },
    }));
  }

  updateFooter(footerPartial: Partial<FooterSection>) {
    this.updateState((draft) => ({
      ...draft,
      footer: { ...draft.footer, ...footerPartial },
    }));
  }

  reorderSections(newOrder: SectionType[]) {
    this.updateState((draft) => ({
      ...draft,
      sectionOrder: newOrder,
    }));
  }

  toggleSectionVisibility(sectionId: SectionType) {
    this.updateState((draft) => {
      const sectionObj = draft[sectionId] as { visible: boolean };
      if (sectionObj) {
        sectionObj.visible = !sectionObj.visible;
      }
      return draft;
    });
  }

  moveSectionUp(sectionId: SectionType) {
    const order = [...this.portfolio().sectionOrder];
    const index = order.indexOf(sectionId);
    if (index > 0) {
      const temp = order[index];
      order[index] = order[index - 1];
      order[index - 1] = temp;
      this.reorderSections(order);
    }
  }

  moveSectionDown(sectionId: SectionType) {
    const order = [...this.portfolio().sectionOrder];
    const index = order.indexOf(sectionId);
    if (index >= 0 && index < order.length - 1) {
      const temp = order[index];
      order[index] = order[index + 1];
      order[index + 1] = temp;
      this.reorderSections(order);
    }
  }

  // Selection & Smooth Scrolling Navigation
  selectSection(sectionId: string | null) {
    this.selectedSectionId.set(sectionId);
    this.selectedItemId.set(null);
  }

  scrollToSection(sectionId: string) {
    const cleanId = sectionId.startsWith('#') ? sectionId.substring(1) : sectionId;
    this.selectSection(cleanId);

    if (typeof document !== 'undefined') {
      setTimeout(() => {
        const el = document.getElementById(cleanId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 50);
    }
  }

  selectItem(itemId: string | null, sectionId?: string) {
    this.selectedItemId.set(itemId);
    if (sectionId) {
      this.selectedSectionId.set(sectionId);
    }
  }

  setActiveTab(tab: 'theme' | 'typography' | 'images' | 'sections' | 'layout' | 'export') {
    this.activeTab.set(tab);
  }

  togglePreviewMode() {
    this.previewMode.set(!this.previewMode());
  }

  // History Controls (Undo / Redo)
  undo() {
    const past = [...this.pastStack()];
    if (past.length === 0) return;

    const previousState = past.pop()!;
    const current = JSON.parse(JSON.stringify(this.portfolio()));

    this.pastStack.set(past);
    this.futureStack.set([...this.futureStack(), current]);
    this.portfolio.set(previousState);
  }

  redo() {
    const future = [...this.futureStack()];
    if (future.length === 0) return;

    const nextState = future.pop()!;
    const current = JSON.parse(JSON.stringify(this.portfolio()));

    this.futureStack.set(future);
    this.pastStack.set([...this.pastStack(), current]);
    this.portfolio.set(nextState);
  }

  resetToDefault() {
    if (confirm('Are you sure you want to reset all customizations to default?')) {
      this.pushHistoryState();
      this.portfolio.set(JSON.parse(JSON.stringify(DEFAULT_PORTFOLIO_DATA)));
      localStorage.removeItem(STORAGE_KEY);
    }
  }
}
