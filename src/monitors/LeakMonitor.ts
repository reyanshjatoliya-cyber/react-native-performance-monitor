class LeakMonitor {
  private tracked: Map<string, any> = new Map();

  track(name: string) {
    this.tracked.set(name, {
      mountedAt: Date.now(),
      unmounted: false,
      resources: [],
    });
  }

  markUnmounted(name: string) {
    const item = this.tracked.get(name);
    if (item) {
      item.unmounted = true;
      item.unmountedAt = Date.now();
    }
  }

  addResource(name: string, resource: any) {
    const item = this.tracked.get(name);
    if (item) {
      item.resources.push(resource);
    }
  }

  removeResource(name: string, resource: any) {
    const item = this.tracked.get(name);
    if (item) {
      item.resources = item.resources.filter((r: any) => r !== resource);
    }
  }

  checkLeaks(timeout = 5000) {
    const now = Date.now();

    this.tracked.forEach((item, name) => {
      if (
        item.unmounted &&
        item.resources.length > 0 &&
        now - item.unmountedAt > timeout
      ) {
        console.warn(
          `[LeakMonitor] Leak detected in ${name}:
          Unreleased resources: ${item.resources.length}`
        );
      }
    });
  }

  startAutoCheck(interval = 3000) {
    setInterval(() => this.checkLeaks(), interval);
  }
}

export default new LeakMonitor();
