import { useEffect } from 'react';

export function useKeyboard(handler) {
	useEffect(() => {
		function onKeyDown(e) {
			switch (e.key) {
				case 'ArrowLeft':
				case 'ArrowRight':
				case 'ArrowUp':
				case 'ArrowDown':
					e.preventDefault();
					handler(e.key);
					break;
				default:
					break;
			}
		}
		window.addEventListener('keydown', onKeyDown, { passive: false });
		return () => window.removeEventListener('keydown', onKeyDown);
	}, [handler]);
}


