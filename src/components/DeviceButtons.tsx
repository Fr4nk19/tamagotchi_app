interface DeviceButtonsProps {
  onPressA: () => void;
  onPressB: () => void;
  onPressC: () => void;
}

function hapticFeedback() {
  if (navigator.vibrate) {
    navigator.vibrate(30);
  }
}

export default function DeviceButtons({ onPressA, onPressB, onPressC }: DeviceButtonsProps) {
  const handleA = () => {
    hapticFeedback();
    onPressA();
  };
  const handleB = () => {
    hapticFeedback();
    onPressB();
  };
  const handleC = () => {
    hapticFeedback();
    onPressC();
  };

  return (
    <div className="buttons-container">
      <button className="device-btn" onClick={handleA} aria-label="Button A - Select">
        A
        <span className="btn-label">SELECT</span>
      </button>
      <button className="device-btn" onClick={handleB} aria-label="Button B - Execute">
        B
        <span className="btn-label">DO</span>
      </button>
      <button className="device-btn" onClick={handleC} aria-label="Button C - Cancel">
        C
        <span className="btn-label">BACK</span>
      </button>
    </div>
  );
}
