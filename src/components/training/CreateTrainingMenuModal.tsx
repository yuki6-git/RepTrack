import { Button, CloseButton, Dialog, Flex, Portal } from "@chakra-ui/react";
import { MenuBasicStep } from "./MenuBasicStep";
import { ExerciseInputStep } from "./ExerciseInputStep";
import { useTrainingMenuModal } from "../../hooks/training/useTrainingMenuModal";
import type { NewExercise } from "../../types/NewExercise";

type Props = {
  tabId: string;
  triggerLabel: string;
  addExercises?: NewExercise[];
  mode: "edit" | "create";
  menuTitle?: string;
};

export const CreateTrainingMenuModal = (props: Props) => {
  const {
    tabId,
    triggerLabel,
    addExercises,
    mode,
    menuTitle: initialMenuTitle,
  } = props;

  const {
    isOpen,
    setIsOpen,
    step,
    setStep,
    menuTitle,
    setMenuTitle,
    selectedParts,
    setSelectedParts,
    isLoading,
    onClickSaveMenu,
    form,
    setForm,
    validationMessage,
    draftExercises,
    onClickAddExercise,
    onClickEditExercise,
    onClickDeleteExercise,
  } = useTrainingMenuModal({
    mode,
    tabId,
    initialMenuTitle,
    addExercises,
  });

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(e) => {
        setIsOpen(e.open);
        !e.open && setStep(1);
      }}
      placement="center"
      size="cover"
    >
      <Dialog.Trigger asChild>
        <Button variant="outline" size="sm">
          {triggerLabel}
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content
            overflow="hidden"
            display="flex"
            flexDirection="column"
          >
            <Dialog.Header>
              <Dialog.Title>
                {step === 1 ? "トレーニングメニューを作成" : "種目追加"}
              </Dialog.Title>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Header>

            <Dialog.Body overflowY="auto">
              {step === 1 && (
                <MenuBasicStep
                  menuTitle={menuTitle}
                  setMenuTitle={setMenuTitle}
                  selectedParts={selectedParts}
                  setSelectedParts={setSelectedParts}
                />
              )}

              {step === 2 && (
                <ExerciseInputStep
                  selectedParts={selectedParts}
                  form={form}
                  setForm={setForm}
                  onClickAddExercise={onClickAddExercise}
                  validationMessage={validationMessage}
                  draftExercises={draftExercises}
                  onClickEditExercise={onClickEditExercise}
                  onClickDeleteExercise={onClickDeleteExercise}
                />
              )}
            </Dialog.Body>

            <Dialog.Footer>
              {step === 1 && (
                <Button
                  disabled={selectedParts.length === 0}
                  onClick={() => setStep(2)}
                >
                  次へ →
                </Button>
              )}

              {step === 2 && (
                <Flex w="100%" justify="space-between">
                  <Button variant="outline" onClick={() => setStep(1)}>
                    ← 戻る
                  </Button>

                  <Button
                    loading={isLoading}
                    disabled={isLoading}
                    onClick={onClickSaveMenu}
                  >
                    保存
                  </Button>
                </Flex>
              )}
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
