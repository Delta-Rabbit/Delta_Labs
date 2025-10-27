/**
 * Delta Labs Theme Components
 * Modular, reusable theme components
 */

// Import components from individual modules
import { Button } from './Button';
import { Input } from './Input';
import { Card } from './Card';
import { Modal } from './Modal';
import { ErrorBanner } from './ErrorBanner';
import { Badge } from './Badge';
import { Spinner } from './Spinner';
import { ThemeToggle } from './ThemeToggle';
import { Checkbox } from './Checkbox';
import { Radio } from './Radio';

// Export with backward-compatible Delta names
export { Button as DeltaButton };
export { Input as DeltaInput };
export { Card as DeltaCard };
export { Modal as DeltaModal };
export { ErrorBanner as DeltaErrorBanner };
export { Badge as DeltaBadge };
export { Spinner as DeltaSpinner };
export { ThemeToggle as DeltaThemeToggle };
export { Checkbox as DeltaCheckbox };
export { Radio as DeltaRadio };

// Re-export icon components
export {
  DeltaIcon,
  CloseIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  EyeIcon,
  EyeOffIcon,
  CheckIcon,
  LoadingIcon,
  ErrorIcon,
  SuccessIcon,
  WarningIcon,
  InfoIcon,
  GoogleIcon,
  AppleIcon,
  GitHubIcon,
  FacebookIcon,
} from './DeltaIcon';

