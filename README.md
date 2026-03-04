# Ad Copy Formatter
A minimal Raycast extension to format and validate Google Ads copy in seconds.

## What It Does
Ad Copy Formatter helps you:
- Format headlines into Title Case
- Copy text as-is
- Track character limits in real time
- Prevent over-limit Google Ads copy
- Quickly clear and reset content

## Features

### 1. Headline Mode
- 30 character limit
- Live character counter
- Visual limit indicator

### 2. Description Mode
- 90 character limit
- Real-time remaining character display

### 3. Smart Status Indicator
- 🟢 Within limit  
- 🟡 Exactly at limit  
- 🔴 Over limit  

### 4. One-Shortcut Workflow
| Action | macOS | Windows |
|--------|-------|---------|
| Copy as Title Case | ⌘ + Return | Ctrl + Enter |
| Copy As Is | ⌘ + ⇧ + C | Ctrl + Shift + C |
| Clear Text | ⌘ + R | Ctrl + R |

## Installation

### Prerequisites
- [Raycast](https://www.raycast.com/) installed (available on macOS and Windows)
- [Node.js](https://nodejs.org/) v16 or higher
- npm (comes with Node.js)

### macOS
1. Open Terminal
2. Clone the repository:
```sh
   git clone https://github.com/karagozmehmet/ad-copy-formatter.git
   cd ad-copy-formatter
```
3. Install dependencies:
```sh
   npm install
```
4. Start the extension in development mode:
```sh
   npm run dev
```
5. Raycast will automatically detect and load the extension.

### Windows
> Raycast for Windows is currently in early access. Download it from [raycast.com](https://www.raycast.com/).

1. Open PowerShell or Windows Terminal
2. Clone the repository:
```sh
   git clone https://github.com/karagozmehmet/ad-copy-formatter.git
   cd ad-copy-formatter
```
3. Install dependencies:
```sh
   npm install
```
4. Start the extension:
```sh
   npm run dev
```
5. Raycast will automatically detect and load the extension.

## Tech Stack
- React (Raycast API)
- TypeScript
- Raycast Form components

## Roadmap
Planned improvements:
- Multiple headline slots (H1 / H2 / H3)
- Bulk formatting
- Smart capitalization rules (minor words handling)
- Export as Google Ads ready format
- Saved templates

## Who It's For
- Performance marketers
- Google Ads specialists
- Freelancers
- Media buyers

## License
MIT
