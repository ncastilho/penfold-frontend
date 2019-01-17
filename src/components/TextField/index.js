import React from "react";
import classnames from 'classnames';

const TextField = ({name, label, value, disabled, placeholder, errors, onChange}) => {
  const hasErrors = errors.length > 0;
  const cx = classnames('form-group', {
    'g-mb-20': !hasErrors,
    'u-has-error-v1 g-mb-0': hasErrors,
  })
  const errorFeedback = errors.map((error, idx) => <small key={idx} className="form-control-feedback">{error}</small>);

  return (
      <div className={cx}>
        <label className='col-form-label g-mb-10'>{label}</label>
          <input className='form-control form-control-md rounded-0 pr-0'
                 type='text'
                 value={value}
                 onChange={(e) => onChange(name, e.target.value)}
                 disabled={disabled}
                 placeholder={placeholder}
          />
        {errorFeedback}
      </div>
  );
};

TextField.defaultProps = {
  onChange: () => {},
  errors: [],
};

export default TextField;