import Button from '@/components/inputs/Button';
import classNames from 'classnames';
import React from 'react';
import { TfiClose } from 'react-icons/tfi';
export default function Overlay(props: OverlayProps) {
  const { toggle, isOpen = false, children, title } = props;

  return (
    <div data-testid="overlay" className={classNames('overlay', { show: isOpen })}>
      <div className="overlay-header">
        <h6 className="title">{title}</h6>
        <Button color="info" onClick={toggle}>
          <TfiClose />
        </Button>
      </div>
      <div className="overlay-body">{children}</div>
    </div>
  );
}
