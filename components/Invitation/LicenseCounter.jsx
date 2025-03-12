import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

const LicenseCounter = ({ current, limit, showIcon = true }) => (
  <div className="pr-2 text-base">
    {`${current}/${limit}`}
    {showIcon && current === limit && (
      <FontAwesomeIcon
        icon={faCircleCheck}
        style={{ color: '#2ddf16' }}
        className="ml-2"
      />
    )}
  </div>
);

export default LicenseCounter;