import { forwardRef } from 'react';
import styles from './modal.module.scss';

type DialogProps = {
  component: React.ReactNode
}

const Dialog = forwardRef<HTMLDialogElement, DialogProps>((function Dialog(props, ref) {

  return (
    <dialog ref={ref} className={styles.dialog}>
      {props.component}
    </dialog>
  );
}));

export default Dialog;

// https://ui.toast.com/posts/ko_20220518
// https://web.dev/articles/building/a-dialog-component?hl=ko#styling_with_open_props