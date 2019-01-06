import React, {Component} from "react";

class TextField extends Component {
  state = {
    name: this.props.name || '',
    value: this.props.value || '',
    disabled: this.props.disabled || false,
    placeholder: this.props.placeholder || this.props.name || '',
  };

  componentDidUpdate = () => {
    this.refs.textField.focus();
  }

  componentWillReceiveProps = (newProps) => {
    this.setState({
          name: newProps.name,
          value: newProps.value,
          disabled: newProps.disabled,
          placeholder: newProps.placeholder,
        }
    )
  }

  edit = () => {
    if (this.state.disabled) {
      this.setState({
            oldValue: this.state.value,
            disabled: false,
          }
      );
    }
  }

  save = () => {
    if (this.state.value !== this.state.oldValue) {
      try {
        this.props.onChange(this.state.value);
      } catch (e) {
        this.setState({
              value: this.state.oldValue,
            }
        );
      }
    }
    this.setState({
          disabled: true,
        }
    );
  }

  render() {
    return (
        <div className='form-group row g-mb-25'>
          <label className='col-sm-2 col-form-label g-mb-10'>{this.state.name}</label>
          <div className='col-sm-10'>
            <div className='input-group g-brd-primary--focus g-cursor-pointer' onClick={this.edit}>
              <input className='form-control form-control-md border-right-0 rounded-0 pr-0'
                     type='text'
                     value={this.state.value}
                     onChange={(e) => this.setState({value: e.target.value})}
                     disabled={this.state.disabled}
                     placeholder={this.state.placeholder}
                     ref='textField'
              />
              <div className='input-group-append'>
                {this.props.onChange &&
                  <span className='input-group-text rounded-0 g-bg-white g-color-gray-light-v1 g-color-green--hover g-cursor-pointer'
                        onClick={this.save}>
                    {this.state.disabled &&
                    <i className='icon-pencil'></i>
                    }
                    {!this.state.disabled &&
                    <i className=' fa fa-save'> Save</i>
                    }
                  </span>
                }

                {!this.props.onChange &&
                  <span className='input-group-text rounded-0 g-bg-white g-color-gray-light-v1'>
                    <i className='icon-pencil'></i>
                  </span>
                }

              </div>
            </div>
          </div>
        </div>
    )
  };
};

export default TextField;