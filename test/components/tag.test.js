import React from 'react';
import { mount, shallow } from 'enzyme';
import Clear from 'react-icons/lib/md/clear';
import Text from 'components/text';
import Tag from 'components/tag';

describe('Tag', () => {
  test('Accepts proxy props', () => {
    const onClick = jest.fn();
    const tag = mount(
      <Tag
        text="text"
        onClick={onClick}
      />,
    );

    expect(tag.at(0).props().onClick).toBe(onClick);
  });

  test('Basic rendering', () => {
    const tag = shallow(
      <Tag text="text" />,
    );

    expect(tag.find(Text).children().text()).toBe('text');
    expect(tag.find(Clear).length).toBe(0);
  });

  test('Dismissable tag', () => {
    const mockOnDismiss = jest.fn();
    const tag = shallow(
      <Tag text="text" onDismiss={mockOnDismiss} dismissable />,
    );

    expect(tag.find(Text).length).toBe(1);
    tag.find(Clear).simulate('click');
    expect(mockOnDismiss).toBeCalled();
  });

  test('Clear icon size', () => {
    const alphaTag = shallow(
      <Tag size="alpha" text="text" dismissable />,
    );
    expect(alphaTag.find(Clear).props().width).toBe('14px');
    expect(alphaTag.find(Clear).props().height).toBe('14px');

    const betaTag = shallow(
      <Tag size="beta" text="text" dismissable />,
    );
    expect(betaTag.find(Clear).props().width).toBe('12px');
    expect(betaTag.find(Clear).props().height).toBe('12px');
  });
});
