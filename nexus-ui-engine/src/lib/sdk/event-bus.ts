type Callback = (data: any) => void;

class EventBus {
  private events: { [key: string]: Callback[] } = {};

  subscribe(event: string, callback: Callback) {
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(callback);
    // Return unsubscribe function for cleanup in React useEffect
    return () => {
      this.events[event] = this.events[event].filter((cb) => cb !== callback);
    };
  }

  emit(event: string, data: any) {
    if (this.events[event]) {
      this.events[event].forEach((callback) => callback(data));
    }
  }
}

export const widgetBus = new EventBus();
