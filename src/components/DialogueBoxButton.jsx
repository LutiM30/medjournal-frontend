import { useRef } from 'react';
import { toast } from 'sonner';
import { Button } from './ui/button';

const {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogTitle,
} = require('./ui/alert-dialog');

const DialogueDescriptionDefault = `This action cannot be undone. This will permanently delete User and data.`;

/**
 * A React component that displays an alert dialog with customizable titles, descriptions, and actions.
 *
 * @component
 * @param {Object} props - The props object.
 * @param {string} [props.triggerVariant='destructive'] - The variant of the trigger button.
 * @param {string} [props.triggerTitle='Delete'] - The title of the trigger button.
 * @param {string} [props.dialogueTitle='Are you absolutely sure?'] - The title of the alert dialog.
 * @param {string} [props.dialogueDescription='This action cannot be undone. This will permanently delete User and data.'] - The description of the alert dialog.
 * @param {string} [props.dialogueNo='Cancel'] - The title of the cancel button in the alert dialog.
 * @param {string} [props.dialogueYes='Continue'] - The title of the action button in the alert dialog.
 * @param {Function} [props.dialogueYesAction=() => {}] - The action to be performed when the action button is clicked.
 * @returns {JSX.Element} - The rendered DialogueButton component.
 */
const DialogueBoxButton = ({
  triggerVariant,
  triggerTitle,
  dialogueTitle,
  dialogueDescription,
  dialogueNo,
  dialogueYes,
  dialogueYesAction = () => {},
}) => {
  const propValues = {
    triggerVariant: triggerVariant || 'destructive',
    triggerTitle: triggerTitle || 'Delete',
    dialogueTitle: dialogueTitle || 'Are you absolutely sure?',
    dialogueDescription: dialogueDescription || DialogueDescriptionDefault,
    dialogueNo: dialogueNo || 'Cancel',
    dialogueYes: dialogueYes || 'Continue',
    dialogueYesAction: dialogueYesAction || (() => {}),
  };
  const cancelButtonRef = useRef(null);

  const onConfirm = async () => {
    try {
      await propValues.dialogueYesAction();
      cancelButtonRef.current?.click();
    } catch (error) {
      console.error(error);
      toast.error(
        'Something went wrong while performing alert action check console.'
      );
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger className='mx-1'>
        <Button variant={propValues.triggerVariant}>
          {propValues.triggerTitle}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{propValues.dialogueTitle}</AlertDialogTitle>
          <AlertDialogDescription>
            {propValues.dialogueDescription}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel ref={cancelButtonRef}>
            {propValues.dialogueNo}
          </AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>
            {propValues.dialogueYes}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DialogueBoxButton;
