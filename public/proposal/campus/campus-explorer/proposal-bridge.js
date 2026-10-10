/* Keep the scene alive between portal tabs without rendering a hidden canvas. */
(() => {
  window.addEventListener('message', event => {
    if (event.source !== window.parent || event.origin !== window.location.origin) return;
    const data = event.data;
    const api = window.campusExplorer;
    if (data?.type === 'proposal:visibility' && typeof data.visible === 'boolean') {
      window.proposalHidden = !data.visible;
      if (!data.visible) { api?.resetManualInput(); api?.manualTakeover(); }
    }
    if (data?.type === 'proposal:destination' && typeof data.destination === 'string' && Object.hasOwn(api?.rooms || {}, data.destination)) {
      const cover = document.getElementById('guide-landing');
      if (cover?.open) cover.close();
      api.navigateToRoom(data.destination);
    }
  });
})();
