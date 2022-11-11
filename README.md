# react-tradingview-widget-components

## Installation
`npm i react-tradingview-widget-components`

## Usage
```typescript
import { SymbolOverview } from "react-tradingview-widget-components";

export const App () => {
    const [ isDarkMode, setIsDarkMode ] = useState<boolean>(true);

    return (
        <SymbolOverview colorTheme={isDarkMode ? "dark" : "light"}/>
    )
};
```

### Widget Props Documentation
- [Symbol Overview](/src/types/SymbolOverviewProps.ts)

## Supported Widgets
- Symbol Overview