import styles from './index.module.scss';
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

const ConnectWallet = () => {
  return (
    <div>
        <h1 className='has-text-centered has-text-white pt-2'>Please before payment connect to your wallet</h1>
        <div className='is-flex is-justify-content-center py-6 mb-5'>
           <WalletMultiButton  /> 
        </div>

    </div>
  )
}

export default ConnectWallet