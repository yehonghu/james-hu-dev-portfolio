/*
 * Titanium Keynote — asset registry.
 * Uses BASE_URL to support deployment under any sub-path (e.g. GitHub Pages).
 */
const base = import.meta.env.BASE_URL.replace(/\/$/, "");

export const ASSETS = {
  logo: `${base}/manus-storage/avatar_james_b2db7aea.webp`,
  heroWorkspace: `${base}/manus-storage/hero_portrait_workspace_0f9072b0.webp`,
  bookease: {
    home: `${base}/manus-storage/bookease_home_4fc6460a.webp`,
    customer: `${base}/manus-storage/bookease_customer_dashboard_66a366a9.webp`,
    availability: `${base}/manus-storage/bookease_provider_availability_fb942c5b.webp`,
    admin: `${base}/manus-storage/bookease_admin_dashboard_34e2e24e.webp`,
    services: `${base}/manus-storage/bookease_services_2425d254.webp`,
  },
  kazan: `${base}/manus-storage/restaurant_web_mockup_eed425f0.webp`,
  velvet: `${base}/manus-storage/figma_web_design_586d8f40.webp`,
  mapleCafe: `${base}/manus-storage/figma_prototype_maplecafe_c9a55dd4.webp`,
  lumen: `${base}/manus-storage/brand_identity_board_3467cd1c.webp`,
  wechatQr: `${base}/manus-storage/wechat_qr_67a44488.webp`,
  iphone15: `${base}/manus-storage/iphone15pro_home_ca046256.webp`,
  ourPlanet: `${base}/manus-storage/ourplanet_home_ec31c366.webp`,
  findHouse: `${base}/manus-storage/findhouse_home_00eda56e.webp`,
  psychMind: `${base}/manus-storage/psychmind_portfolio_preview.webp`,
  gameLibrary: `${base}/manus-storage/group9_game_portfolio_preview.webp`,
  bookeaseLive: `${base}/manus-storage/bookease_live_2026.webp`,
  etteLive: `${base}/manus-storage/ette_pohub_process_2026.svg`,
  findHouseLive: `${base}/manus-storage/findhouse_live_2026.webp`,
  psychMindLive: `${base}/manus-storage/psychmind_live_2026.webp`,
  ourPlanetLive: `${base}/manus-storage/ourplanet_live_2026.webp`,
  iphone15Live: `${base}/manus-storage/iphone15_live_2026.webp`,
  gameLibraryLive: `${base}/manus-storage/game_library_live_2026.webp`,
};
