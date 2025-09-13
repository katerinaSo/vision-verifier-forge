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
    'M': { patterns: ['R-B-R', 'G-Y-G'], meaning: 'discovery pattern / complementary flow' },
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

  const VerticalLetter = ({ letter, pattern, meaning }: { letter: string; pattern: string[]; meaning?: string }) => (
    <div className="flex flex-col items-center space-y-1">
      <Badge variant="outline" className="text-sm font-bold mb-1">
        {letter}
      </Badge>
      <div className="flex flex-col gap-0.5">
        {pattern.map((color, i) => (
          <ColorSquare key={i} color={color} />
        ))}
      </div>
      {meaning && (
        <p className="text-xs text-muted-foreground text-center max-w-20 mt-1">
          {meaning}
        </p>
      )}
    </div>
  );

  const WordGrid = ({ letters, keyType, spacing = "gap-2" }: { 
    letters: { letter: string; pattern: string[]; meaning?: string }[]; 
    keyType: 'major' | 'minor';
    spacing?: string;
  }) => {
    const keyBg = keyType === 'major' ? 'bg-lang-yellow/20' : 'bg-lang-blue/20';
    const keyBorder = keyType === 'major' ? 'border-lang-yellow' : 'border-lang-blue';
    
    return (
      <div className={`p-4 rounded-lg border-2 ${keyBg} ${keyBorder}`}>
        <h5 className="text-center font-medium mb-3 capitalize">{keyType} Key</h5>
        <div className={`flex ${spacing} justify-center`}>
          {letters.map((letter, index) => (
            <VerticalLetter
              key={index}
              letter={letter.letter}
              pattern={letter.pattern}
              meaning={letter.meaning}
            />
          ))}
        </div>
      </div>
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
              <div className="flex flex-wrap gap-6 justify-center">
                {Object.entries(letterEncodings).map(([letter, data]) => (
                  <VerticalLetter
                    key={letter}
                    letter={letter}
                    pattern={data.patterns[0].split('-')}
                    meaning={data.meaning}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Encoded Output */}
        {encodedLetters.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Visual Encoding - Grid View</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-8 justify-center">
                {encodedLetters.map((item, index) => (
                  <VerticalLetter
                    key={index}
                    letter={item.letter}
                    pattern={item.pattern}
                    meaning={item.meaning}
                  />
                ))}
              </div>
              
              {/* Special demonstration for OM */}
              {inputText.toUpperCase().includes('OM') && (
                <div className="mt-8 space-y-6">
                  <h4 className="text-center font-semibold text-lg">Word Grid: OM - Key Variations</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Major Key - using first patterns */}
                    <WordGrid
                      keyType="major"
                      spacing="gap-1"
                      letters={[
                        { letter: "O", pattern: ['B', 'R', 'B'], meaning: "ember under water" },
                        { letter: "M", pattern: ['R', 'B', 'R'], meaning: "discovery pattern" },
                      ]}
                    />
                    
                    {/* Minor Key - using complementary patterns */}
                    <WordGrid
                      keyType="minor"
                      spacing="gap-1"
                      letters={[
                        { letter: "O", pattern: ['Y', 'G', 'Y'], meaning: "life surrounded by light" },
                        { letter: "M", pattern: ['G', 'Y', 'G'], meaning: "complementary flow" },
                      ]}
                    />
                  </div>
                  
                  <div className="text-center text-sm text-muted-foreground space-y-2">
                    <p>Notice how the keys create different harmonic relationships:</p>
                    <p><span className="text-lang-yellow font-medium">Major:</span> B-R-B with R-B-R creates balanced tension</p>
                    <p><span className="text-lang-blue font-medium">Minor:</span> Y-G-Y with G-Y-G flows in complementary harmony</p>
                  </div>
                </div>
              )}
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