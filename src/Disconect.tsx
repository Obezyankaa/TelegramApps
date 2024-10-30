import { useTonConnectUI } from '@tonconnect/ui-react';

export default function Disconect() {
     const [tonConnectUI] = useTonConnectUI();
      const handleDisconnect = () => {
        tonConnectUI.disconnect();
      };

    return <button style={{ backgroundColor: "blue", color: 'white', position: 'absolute', bottom: '5%', left: '5%'}} onClick={handleDisconnect}>Disconnect wallet</button>;
}
