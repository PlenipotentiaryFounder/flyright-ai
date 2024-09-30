import React from 'react';
import { Input } from '../../Common/Components/Input';
import Button, { ButtonProps } from '../../Common/Components/Button';

interface InputAreaProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  handleSendMessage: (content: string) => void;
  showReferences: boolean;
  onShowReferences: () => void;
  isLoading: boolean;
}

// Remove this interface as we're now importing ButtonProps
// interface ExtendedButtonProps extends ButtonProps {
//   disabled?: boolean;
// }

const InputArea: React.FC<InputAreaProps> = ({
  inputValue,
  setInputValue,
  handleSendMessage,
  showReferences,
  onShowReferences,
  isLoading,
}) => {
  return (
    <div className="flex space-x-2">
      {showReferences && (
        <Button
          size="small"
          variant="outline"
          onClick={onShowReferences}
          className="bg-white mr-2"
          disabled={isLoading}
        >
          Show Resources
        </Button>
      )}
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Ask FlyRight AI a question..."
        className="flex-grow"
        onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSendMessage(inputValue)}
        disabled={isLoading}
      />
      <Button 
        onClick={() => handleSendMessage(inputValue)} 
        className="bg-sky-600 hover:bg-sky-700 text-white"
        disabled={isLoading}
      >
        Send
      </Button>
    </div>
  );
};

export default InputArea;