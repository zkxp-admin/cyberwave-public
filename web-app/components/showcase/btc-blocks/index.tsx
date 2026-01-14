'use client'

import { Clock, Hash, Pickaxe, TrendingUp, Zap } from 'lucide-react'
import * as React from 'react'
import { sampleBTCBlocks, type BTCBlock } from './sample-data'

function formatTimestamp(timestamp: number): string {
  const now = Date.now()
  const diff = now - timestamp
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)

  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  return new Date(timestamp).toLocaleString()
}

function formatHash(hash: string): string {
  return `${hash.slice(0, 10)}...${hash.slice(-8)}`
}

interface BlockCardProps {
  block: BTCBlock
}

function BlockCard({ block }: BlockCardProps) {
  const isPast = block.status === 'past'
  const isCurrent = block.status === 'current'
  const isFuture = block.status === 'future'

  return (
    <div
      className={`group relative overflow-hidden rounded-lg border transition-all duration-300 h-full ${
        isCurrent
          ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 shadow-lg shadow-blue-500/20 dark:from-blue-950/50 dark:to-blue-900/30 dark:shadow-blue-500/10'
          : isPast
            ? 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md dark:border-gray-700 dark:bg-gray-800 dark:hover:border-gray-600'
            : 'border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50 hover:border-purple-300 dark:border-purple-800 dark:from-purple-950/30 dark:to-pink-950/20'
      }`}
    >
      {/* Status indicator */}
      <div
        className={`absolute right-0 top-0 px-2 py-1 text-xs font-semibold rounded-bl-lg ${
          isCurrent
            ? 'bg-blue-500 text-white'
            : isPast
              ? 'bg-gray-500 text-white dark:bg-gray-600'
              : 'bg-purple-500 text-white'
        }`}
      >
        {isCurrent ? 'CURRENT' : isPast ? 'MINED' : 'PENDING'}
      </div>

      <div className="p-4">
        {/* Block Number */}
        <div className="mb-3 flex items-center gap-2">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded ${
              isCurrent
                ? 'bg-blue-500 text-white'
                : isPast
                  ? 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
                  : 'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300'
            }`}
          >
            <Hash className="h-4 w-4" />
          </div>
          <div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Block
            </div>
            <div className="font-orbitron text-base font-bold text-gray-900 dark:text-gray-100">
              {block.blockNumber.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Block Details Grid */}
        <div className="space-y-2">
          {/* Timestamp / Miner */}
          {isPast || isCurrent ? (
            <div className="flex items-center gap-2 text-xs">
              <Clock className="h-3.5 w-3.5 text-gray-400" />
              <span className="text-gray-600 dark:text-gray-400">
                {block.timestamp ? formatTimestamp(block.timestamp) : 'N/A'}
              </span>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-xs">
              <Pickaxe className="h-3.5 w-3.5 text-purple-500" />
              <span className="font-medium text-gray-700 dark:text-gray-300 truncate">
                {block.miner}
              </span>
            </div>
          )}

          {/* Transaction Count */}
          {block.txCount !== null && (
            <div className="flex items-center justify-between rounded bg-gray-50 px-2 py-1.5 dark:bg-gray-900/50">
              <div className="flex items-center gap-1.5">
                <Zap className="h-3.5 w-3.5 text-yellow-500" />
                <span className="text-xs text-gray-600 dark:text-gray-400">
                  TXs
                </span>
              </div>
              <span className="font-semibold text-sm text-gray-900 dark:text-gray-100">
                {block.txCount.toLocaleString()}
              </span>
            </div>
          )}

          {/* Reward */}
          <div className="flex items-center justify-between rounded bg-orange-50 px-2 py-1.5 dark:bg-orange-950/30">
            <div className="flex items-center gap-1.5">
              <TrendingUp className="h-3.5 w-3.5 text-orange-500" />
              <span className="text-xs text-gray-600 dark:text-gray-400">
                Reward
              </span>
            </div>
            <span className="font-orbitron font-bold text-sm text-orange-600 dark:text-orange-400">
              {block.reward} BTC
            </span>
          </div>

          {/* Block Hash (for past/current blocks) */}
          {block.hash && (
            <div className="mt-2 rounded border border-gray-200 bg-gray-50 p-1.5 dark:border-gray-700 dark:bg-gray-900/50">
              <div className="mb-0.5 text-xs text-gray-500 dark:text-gray-400">
                Hash
              </div>
              <code className="font-mono text-xs text-gray-700 dark:text-gray-300 break-all">
                {formatHash(block.hash)}
              </code>
            </div>
          )}

          {/* Block Size (for past blocks) */}
          {block.size && (
            <div className="text-xs text-gray-500 dark:text-gray-400">
              Size: {block.size} MB
            </div>
          )}
        </div>
      </div>

      {/* Animated border for current block */}
      {isCurrent && (
        <div className="absolute inset-0 -z-10 animate-pulse rounded-lg bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 opacity-20 blur-xl" />
      )}
    </div>
  )
}

export function BTCBlocks() {
  // Calculate initial index from sample data before filtering
  const initialCurrentIndex = React.useMemo(() => {
    const pastCount = sampleBTCBlocks.filter((b) => b.status === 'past').length
    return pastCount
  }, [])

  const pastBlocks = sampleBTCBlocks.filter((b) => b.status === 'past')
  const currentBlock = sampleBTCBlocks.find((b) => b.status === 'current')
  const futureBlocks = sampleBTCBlocks.filter((b) => b.status === 'future')

  // All blocks for carousel
  const allBlocks = [...pastBlocks, currentBlock!, ...futureBlocks]
  const totalBlocks = allBlocks.length
  
  // Initialize carousel at the current block
  const [currentIndex, setCurrentIndex] = React.useState(initialCurrentIndex)

  // For desktop carousel: show 3 blocks at a time
  const blocksToShow = 3
  const maxIndex = Math.max(0, totalBlocks - blocksToShow)

  // Mobile: cycle through all blocks
  const handlePreviousMobile = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : totalBlocks - 1))
  }

  const handleNextMobile = () => {
    setCurrentIndex((prev) => (prev < totalBlocks - 1 ? prev + 1 : 0))
  }

  // Desktop: carousel with 3 blocks visible
  const handlePreviousDesktop = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : maxIndex))
  }

  const handleNextDesktop = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0))
  }

  // Calculate transform for desktop carousel (show 3 blocks at a time)
  // Each block is 256px (w-64) + 16px gap (gap-4) = 272px per block
  const blockWidth = 272 // w-64 (256px) + gap-4 (16px)
  const translateX = `-${currentIndex * blockWidth}px`

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-orbitron text-lg font-bold text-gray-900 dark:text-gray-100">
            Bitcoin Blockchain
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Real-time block mining status
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-green-50 px-4 py-2 dark:bg-green-950/30">
          <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
          <span className="text-sm font-medium text-green-700 dark:text-green-300">
            Live
          </span>
        </div>
      </div>

      {/* Mobile: Single Block Carousel */}
      <div className="lg:hidden">
        <div className="relative">
          <BlockCard block={allBlocks[currentIndex]} />
          
          {/* Navigation Arrows */}
          <button
            onClick={handlePreviousMobile}
            className="absolute left-0 top-1/2 -translate-x-4 -translate-y-1/2 rounded-full bg-white p-2 shadow-lg transition-all hover:scale-110 dark:bg-gray-800"
            aria-label="Previous block"
          >
            <svg
              className="h-5 w-5 text-gray-700 dark:text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={handleNextMobile}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 rounded-full bg-white p-2 shadow-lg transition-all hover:scale-110 dark:bg-gray-800"
            aria-label="Next block"
          >
            <svg
              className="h-5 w-5 text-gray-700 dark:text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="mt-4 flex justify-center gap-2">
          {allBlocks.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'w-8 bg-blue-500'
                  : 'w-2 bg-gray-300 dark:bg-gray-600'
              }`}
              aria-label={`Go to block ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Desktop: Carousel */}
      <div className="hidden lg:block">
        <div className="relative">
          {/* Carousel Container */}
          <div className="overflow-hidden">
            <div
              className="flex items-stretch gap-4 transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(${translateX})` }}
            >
              {allBlocks.map((block) => (
                <div
                  key={block.blockNumber}
                  className="w-64 flex-shrink-0"
                >
                  <BlockCard block={block} />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={handlePreviousDesktop}
            className="absolute left-0 top-1/2 -translate-x-12 -translate-y-1/2 rounded-full bg-white p-3 shadow-lg transition-all hover:scale-110 hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700"
            aria-label="Previous block"
          >
            <svg
              className="h-6 w-6 text-gray-700 dark:text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={handleNextDesktop}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 rounded-full bg-white p-3 shadow-lg transition-all hover:scale-110 hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700"
            aria-label="Next block"
          >
            <svg
              className="h-6 w-6 text-gray-700 dark:text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Dots Indicator */}
          <div className="mt-6 flex justify-center gap-2">
            {allBlocks.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'w-8 bg-blue-500'
                    : 'w-2 bg-gray-300 dark:bg-gray-600'
                }`}
                aria-label={`Go to block ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-gray-500" />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Past Blocks
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-blue-500" />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Current Block
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-purple-500" />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Future Blocks
          </span>
        </div>
      </div>
    </div>
  )
}
