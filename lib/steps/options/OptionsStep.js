import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Option from './Option';
import OptionElement from './OptionElement';
import OptionText from './OptionText';
import Options from './Options';
import Loading from '../common/Loading';

class OptionsStep extends Component {
  /* istanbul ignore next */
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
    this.renderOption = this.renderOption.bind(this);
    this.onOptionClick = this.onOptionClick.bind(this);
  }
  componentDidMount(){
    setTimeout(() => {
      this.setState({ loading: false });
    }, 1000);
  }
  onOptionClick({ value }) {
    this.props.triggerNextStep({ value });
  }

  renderOption(option) {
    const { bubbleStyle } = this.props;
    const { bubbleColor, fontColor } = this.props.step;
    const { value, label } = option;


    return (
          <Option
            key={value}
            className="rsc-os-option"
            onPress={() => this.onOptionClick({ value })}
          >
          { this.state.loading && <Loading color={fontColor} /> }
          {!this.state.loading &&
            <OptionElement
              className="rsc-os-option-element"
              style={bubbleStyle}
              bubbleColor={bubbleColor}
            >
              <OptionText
                class="rsc-os-option-text"
                fontColor={fontColor}
              >
                {label}
              </OptionText>
            </OptionElement>
          }
          </Option>
    );
  }

  render() {
    const { options } = this.props.step;

    return (
      <Options className="rsc-os">
        {_.map(options, this.renderOption)}
      </Options>
    );
  }
}

OptionsStep.propTypes = {
  step: PropTypes.object.isRequired,
  triggerNextStep: PropTypes.func.isRequired,
  bubbleStyle: PropTypes.object.isRequired,
};

export default OptionsStep;
