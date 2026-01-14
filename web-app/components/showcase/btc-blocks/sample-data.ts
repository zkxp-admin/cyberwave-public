export interface BTCBlock {
  blockNumber: number
  timestamp: number | null // null for future blocks
  txCount: number | null // null for future blocks
  reward: number
  miner: string | null // null for past blocks, shown for future
  status: 'past' | 'current' | 'future'
  hash?: string // only for past/current blocks
  size?: number // in KB, only for past blocks
}

export const sampleBTCBlocks: BTCBlock[] = [
  // Past blocks (2 blocks)
  {
    blockNumber: 875433,
    timestamp: Date.now() - 2400000, // 40 minutes ago
    txCount: 2891,
    reward: 6.25,
    miner: null,
    status: 'past',
    hash: '00000000000000000003b8d5d2f59e87d6b48a03276b381267c8b9e83839b165',
    size: 1.1,
  },
  {
    blockNumber: 875434,
    timestamp: Date.now() - 1200000, // 20 minutes ago
    txCount: 3102,
    reward: 6.25,
    miner: null,
    status: 'past',
    hash: '00000000000000000001c9e6e3g60f98e7c59b14387c492378d9c0f94940c276',
    size: 1.3,
  },
  // Current block
  {
    blockNumber: 875435,
    timestamp: Date.now(),
    txCount: 1847,
    reward: 6.25,
    miner: null,
    status: 'current',
    hash: '00000000000000000004d0f7f4h71g09f8d60c25498d503489e0d1g05051d387',
    size: 0.9,
  },
  // Future blocks (3 blocks)
  {
    blockNumber: 875436,
    timestamp: null,
    txCount: null,
    reward: 6.25,
    miner: 'Foundry USA',
    status: 'future',
  },
  {
    blockNumber: 875437,
    timestamp: null,
    txCount: null,
    reward: 6.25,
    miner: 'AntPool',
    status: 'future',
  },
  {
    blockNumber: 875438,
    timestamp: null,
    txCount: null,
    reward: 6.25,
    miner: 'F2Pool',
    status: 'future',
  },
]
