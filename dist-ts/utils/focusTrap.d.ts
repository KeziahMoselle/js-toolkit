/**
 * Use a trap/untrap tabs logic.
 *
 * @return {Object} An object containing the trap and untrap methods.
 */
export default function useFocusTrap(): {
    trap: (element: Element, event: KeyboardEvent) => void;
    untrap: () => void;
    saveActiveElement: () => void;
};
