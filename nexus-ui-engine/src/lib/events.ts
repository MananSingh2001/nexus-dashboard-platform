export const widgetBus = {
  emit(event: string, data: any) {
    window.dispatchEvent(new CustomEvent(event, { detail: data }));
  },
  on(event: string, callback: (data: any) => void) {
    window.addEventListener(event, (e: any) => callback(e.detail));
  },
};
