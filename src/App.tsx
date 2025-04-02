import { useEffect, useState } from 'react';
import { Mosaic, MosaicNode, MosaicWindow } from 'react-mosaic-component';
import 'react-mosaic-component/react-mosaic-component.css';
import CompanyInfoWidget from './components/CompanyInfoWidget';
import RemoveButton from './components/UI/RemoveButton';
import AddButton from './components/UI/AddButton';

type ViewId = string;

function App() {
  const [layout, setLayout] = useState<MosaicNode<ViewId>>({
    direction: 'row',
    first: 'company1',
    second: {
      direction: 'column',
      first: 'company2',
      second: 'company3',
    },
    splitPercentage: 33,
  });

  const [selectedTickers, setSelectedTickers] = useState<
    Record<ViewId, string>
  >({
    company1: 'AAPL',
    company2: 'MSFT',
    company3: 'NVDA',
  });

  const TILE_MAP: Record<ViewId, React.ReactNode> = {};

  useEffect(() => {
    if (!layout) {
      setLayout({
        direction: 'row',
        first: 'company1',
        second: {
          direction: 'column',
          first: 'company2',
          second: 'company3',
        },
        splitPercentage: 33,
      });
    }
  }, [layout]);

  const [companyCounter, setCompanyCounter] = useState(4);

  const updateTicker = (windowId: ViewId, ticker: string) => {
    setSelectedTickers((prev) => ({
      ...prev,
      [windowId]: ticker,
    }));
  };

  const addNewCompany = () => {
    const newId = `company${companyCounter}`;

    setCompanyCounter(companyCounter + 1);

    setSelectedTickers((prev) => ({
      ...prev,
      [newId]: 'GOOG',
    }));

    if (!layout) {
      setLayout(newId);
      return;
    }

    setLayout({
      direction: 'row',
      first: layout,
      second: newId,
      splitPercentage: 75,
    });
  };

  const removeCompany = (windowId: ViewId) => {
    setLayout((prevLayout) => {
      if (!prevLayout) return prevLayout;

      if (typeof prevLayout === 'string' && prevLayout === windowId) {
        return prevLayout;
      }

      const removeNode = (
        node: MosaicNode<ViewId> | null
      ): MosaicNode<ViewId> | null => {
        if (!node) return null;
        if (node === windowId) return null;
        if (typeof node === 'string') return node;
        if (node.first === windowId) return node.second;
        if (node.second === windowId) return node.first;

        const first = removeNode(node.first);
        const second = removeNode(node.second);

        if (!first && !second) return null;
        if (!first) return second;
        if (!second) return first;

        return {
          ...node,
          first,
          second,
        };
      };

      const result = removeNode(prevLayout);
      return result || prevLayout;
    });

    setSelectedTickers((prev) => {
      const newTickers = { ...prev };
      delete newTickers[windowId];
      return newTickers;
    });
  };

  const createTitleForWindow = (id: ViewId) => {
    return `Company: ${selectedTickers[id]}`;
  };

  Object.keys(selectedTickers).forEach((id) => {
    TILE_MAP[id] = (
      <CompanyInfoWidget
        ticker={selectedTickers[id]}
        onTickerChange={(ticker) => updateTicker(id, ticker)}
      />
    );
  });

  return (
    <div className="h-screen flex flex-col  ">
      <div className="flex justify-between p-3 bg-gray-800 text-white">
        <h1 className="text-xl font-bold"> Dashboard</h1>
        <AddButton onClick={addNewCompany} />
      </div>
      <div className="flex-grow">
        <Mosaic<ViewId>
          renderTile={(id, path) => (
            <MosaicWindow<ViewId>
              path={path}
              title={createTitleForWindow(id)}
              draggable={true}
              toolbarControls={[
                Object.keys(selectedTickers).length > 1 && (
                  <RemoveButton onClick={() => removeCompany(id)} />
                ),
              ].filter(Boolean)}
            >
              {TILE_MAP[id]}
            </MosaicWindow>
          )}
          value={layout}
          onChange={(newNode) => {
            if (newNode !== null) {
              setLayout(newNode);
            }
          }}
          className="mosaic-blueprint-theme bp4-dark"
        />
      </div>
    </div>
  );
}

export default App;
