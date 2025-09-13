import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

const Index = () => {
  const [inputText, setInputText] = useState("");
  const [encodedLetters, setEncodedLetters] = useState<{ letter: string; pattern: string[]; meaning?: string }[]>([]);

  // Our growing dictionary of letter encodings
  const letterEncodings = {
    'E': { patterns: ['R-R-R', 'G-G-G'], meaning: 'rhythm monolith' },
    'O': { patterns: ['B-R-B', 'Y-G-Y'], meaning: 'ember under water / life surrounded by light' },
  };

  const encodeText = () => {
    const letters = inputText.toUpperCase().split('').filter(char => char !== ' ');
    const encoded = letters.map(letter => {
      const encoding = letterEncodings[letter as keyof typeof letterEncodings];
      if (encoding) {
        return {
          letter,
          pattern: encoding.patterns[0].split('-'),
          meaning: encoding.meaning
        };
      }
      return {
        letter,
        pattern: ['?', '?', '?'],
        meaning: 'awaiting discovery'
      };
    });
    setEncodedLetters(encoded);
  };

  const ColorSquare = ({ color }: { color: string }) => {
    const colorMap = {
      'R': 'bg-lang-red',
      'G': 'bg-lang-green',
      'B': 'bg-lang-blue',
      'Y': 'bg-lang-yellow',
      '?': 'bg-muted'
    };
    
    return (
      <div className={`w-8 h-8 rounded-sm border ${colorMap[color as keyof typeof colorMap] || 'bg-muted'}`} />
    );
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <header className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">
            Visual Language Laboratory
          </h1>
          <p className="text-xl text-muted-foreground">
            Our collaborative journey to discover color-encoded communication
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Text Input & Encoding */}
          <Card>
            <CardHeader>
              <CardTitle>Text to Encode</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Enter text to explore our visual language..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="min-h-32"
              />
              <Button onClick={encodeText} disabled={!inputText.trim()}>
                Encode Text
              </Button>
            </CardContent>
          </Card>

          {/* Current Dictionary */}
          <Card>
            <CardHeader>
              <CardTitle>Letter Dictionary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(letterEncodings).map(([letter, data]) => (
                  <div key={letter} className="border rounded-lg p-4">
                    <div className="flex items-center gap-4 mb-2">
                      <Badge variant="outline" className="text-lg font-bold">
                        {letter}
                      </Badge>
                      <div className="flex gap-1">
                        {data.patterns[0].split('-').map((color, i) => (
                          <ColorSquare key={i} color={color} />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground italic">
                      {data.meaning}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Encoded Output */}
        {encodedLetters.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Visual Encoding</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-6">
                {encodedLetters.map((item, index) => (
                  <div key={index} className="text-center space-y-2">
                    <Badge variant="outline">{item.letter}</Badge>
                    <div className="flex gap-1">
                      {item.pattern.map((color, i) => (
                        <ColorSquare key={i} color={color} />
                      ))}
                    </div>
                    {item.meaning && (
                      <p className="text-xs text-muted-foreground max-w-24">
                        {item.meaning}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Discovery Notes */}
        <Card>
          <CardHeader>
            <CardTitle>Discovery Process</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm">
              <div className="border-l-4 border-lang-red pl-4">
                <h4 className="font-semibold">Complementary Pairs</h4>
                <p>Green-Red, Blue-Yellow create our fundamental tensions</p>
              </div>
              <div className="border-l-4 border-lang-yellow pl-4">
                <h4 className="font-semibold">Monoliths</h4>
                <p>Word spaces (Yellow/Blue), Letter E (Red/Green) provide rhythm</p>
              </div>
              <div className="border-l-4 border-lang-blue pl-4">
                <h4 className="font-semibold">Movement Patterns</h4>
                <p>YYB, BBY - directional flows based on sonic and semantic weight</p>
              </div>
              <div className="border-l-4 border-lang-green pl-4">
                <h4 className="font-semibold">Symmetry & Asymmetry</h4>
                <p>B-R-B (symmetrical) vs. other patterns create visual structure variety</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;