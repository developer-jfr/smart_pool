import { ISendTransaction } from 'models/ITransaction';
import {createAsyncThunk} from "@reduxjs/toolkit";
import { clusterApiUrl, Connection, LAMPORTS_PER_SOL, PublicKey, RpcResponseAndContext, SignatureResultCallback, SystemProgram, Transaction } from "@solana/web3.js";
import { useRef } from 'react';
import BigNumber from 'bignumber.js';
import { useWallet } from '@solana/wallet-adapter-react';



