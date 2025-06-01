export function useSecureNavigation() {{

    const preventBack = () => {
        window.addEventListener('popstate', function () {
            history.pushState(null, '', window.location.href);
        });
    }
    return {
    preventBack
  }

}}