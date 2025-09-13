import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import visualLanguageAbstract from "@/assets/visual-language-abstract.jpg";
import mamaGridDirect from "@/assets/mama-grid-direct.jpg";

const Index = () => {
  const [inputText, setInputText] = useState("");
  const [encodedLetters, setEncodedLetters] = useState<{ letter: string; pattern: string[]; meaning?: string }[]>([]);

  // Our growing dictionary of letter encodings
  const letterEncodings = {
    'A': { patterns: ['Y-R-Y', 'B-G-B'], meaning: 'the first breath of creation' },
    'E': { patterns: ['R-R-R', 'G-G-G'], meaning: 'rhythm monolith' },
    'O': { patterns: ['B-R-B', 'Y-G-Y'], meaning: 'ember under water / life surrounded by light' },
    'M': { patterns: ['R-B-R', 'G-Y-G'], meaning: 'discovery pattern / complementary flow' },
  };

  const encodeText = () => {
    console.log("Encode button clicked, inputText:", inputText);
    const letters = inputText.toUpperCase().split('').filter(char => char !== ' ');
    console.log("Letters to encode:", letters);
    
    const encoded = letters.map(letter => {
      const encoding = letterEncodings[letter as keyof typeof letterEncodings];
      console.log(`Encoding for ${letter}:`, encoding);
      
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
    
    console.log("Encoded result:", encoded);
    setEncodedLetters(encoded);
  };

  const ColorSquare = ({ color, muted = false }: { color: string; muted?: boolean }) => {
    const colorMap = {
      'R': muted ? 'bg-[hsl(var(--lang-red-muted))]' : 'bg-lang-red',
      'G': muted ? 'bg-[hsl(var(--lang-green-muted))]' : 'bg-lang-green', 
      'B': muted ? 'bg-[hsl(var(--lang-blue-muted))]' : 'bg-lang-blue',
      'Y': muted ? 'bg-[hsl(var(--lang-yellow-muted))]' : 'bg-lang-yellow',
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

  const WordGrid = ({ letters, keyType, spacing = "gap-0" }: { 
    letters: { letter: string; pattern: string[]; meaning?: string }[]; 
    keyType: 'major' | 'minor';
    spacing?: string;
  }) => {
    const keyBg = keyType === 'major' ? 'bg-lang-yellow/20' : 'bg-lang-blue/20';
    const keyBorder = keyType === 'major' ? 'border-lang-yellow' : 'border-lang-blue';
    
    return (
      <div className={`p-4 rounded-lg border-2 ${keyBg} ${keyBorder}`}>
        <h5 className="text-center font-medium mb-3 capitalize">{keyType} Key</h5>
        <div className={`flex ${spacing} justify-center items-start`}>
          {letters.map((letter, index) => (
            <div key={index} className="flex flex-col items-center">
              <Badge variant="outline" className="text-sm font-bold mb-1">
                {letter.letter}
              </Badge>
              <div className="flex flex-col">
                {letter.pattern.map((color, i) => (
                  <ColorSquare key={i} color={color} />
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 text-center">
          <p className="text-xs text-muted-foreground">
            Colors touching create harmonic relationships beyond individual letters
          </p>
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
              <CardTitle>Encoded Text</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex gap-0 justify-center mb-6">
                {encodedLetters.map((letter, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <Badge variant="outline" className="text-sm font-bold mb-1">
                      {letter.letter}
                    </Badge>
                    <div className="flex flex-col">
                      {letter.pattern.map((color, i) => (
                        <ColorSquare key={i} color={color} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Complete MAMA Variations with Word Spaces */}
              {inputText.toUpperCase().includes('MAMA') && (
                <div className="mt-8 space-y-6">
                  <h4 className="text-center font-semibold text-lg">MAMA: Complete Dimensional Space</h4>
                  
                  <div className="space-y-8">
                    {/* BBB Space Composition */}
                    <div className="space-y-3">
                      <h5 className="text-center font-semibold text-lg">MAMA - BBB Space Key</h5>
                      <div className="p-6 rounded-lg border bg-card/50">
                        <div className="flex flex-col gap-0 items-center">
                          {[0,1,2,3].map(row => (
                            <div key={row} className="flex gap-0">
                              {[
                                // 4x4 grid with vertical and horizontal relationships
                                // Row 1: M starts R-B-R, progressing A variations
                                [['R','B','R'], ['Y','R','Y'], ['R','B','R'], ['Y','R','Y']], // Pure symmetry
                                [['R','B','R'], ['Y','R','Y'], ['R','B','R'], ['B','G','B']], // A shifts
                                [['R','B','R'], ['Y','R','Y'], ['G','Y','G'], ['Y','R','Y']], // M shifts
                                [['R','B','R'], ['Y','R','Y'], ['G','Y','G'], ['B','G','B']], // Both shift
                                
                                // Row 2: M starts R-B-R, A starts B-G-B
                                [['R','B','R'], ['B','G','B'], ['R','B','R'], ['Y','R','Y']], // A complement start
                                [['R','B','R'], ['B','G','B'], ['R','B','R'], ['B','G','B']], // A stays complement
                                [['R','B','R'], ['B','G','B'], ['G','Y','G'], ['Y','R','Y']], // M shifts, A back
                                [['R','B','R'], ['B','G','B'], ['G','Y','G'], ['B','G','B']], // Both complement
                                
                                // Row 3: M starts G-Y-G, A starts Y-R-Y
                                [['G','Y','G'], ['Y','R','Y'], ['R','B','R'], ['Y','R','Y']], // M complement start
                                [['G','Y','G'], ['Y','R','Y'], ['R','B','R'], ['B','G','B']], // M complement, A shifts
                                [['G','Y','G'], ['Y','R','Y'], ['G','Y','G'], ['Y','R','Y']], // M stays, A back
                                [['G','Y','G'], ['Y','R','Y'], ['G','Y','G'], ['B','G','B']], // M stays, A shifts
                                
                                // Row 4: M starts G-Y-G, A starts B-G-B - full complement
                                [['G','Y','G'], ['B','G','B'], ['R','B','R'], ['Y','R','Y']], // Back to origin
                                [['G','Y','G'], ['B','G','B'], ['R','B','R'], ['B','G','B']], // Mixed state
                                [['G','Y','G'], ['B','G','B'], ['G','Y','G'], ['Y','R','Y']], // M complement
                                [['G','Y','G'], ['B','G','B'], ['G','Y','G'], ['B','G','B']], // Full complement
                              ].slice(row * 4, (row + 1) * 4).map((patterns, index) => (
                                <div key={index} className="flex gap-0">
                                  <div className="flex gap-0">
                                    {patterns.map((pattern, letterIndex) => (
                                      <div key={letterIndex} className="flex flex-col gap-0">
                                        {pattern.map((color, i) => (
                                          <ColorSquare key={i} color={color} />
                                        ))}
                                      </div>
                                    ))}
                                  </div>
                                  {index < 3 && (
                                    <div className="flex flex-col gap-0">
                                      {['B','B','B'].map((color, i) => (
                                        <ColorSquare key={i} color={color} muted={true} />
                                      ))}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* YYY Space Composition */}
                    <div className="space-y-3">
                      <h5 className="text-center font-semibold text-lg">MAMA - YYY Space Key</h5>
                      <div className="p-6 rounded-lg border bg-card/50">
                        <div className="flex flex-col gap-0 items-center">
                          {[0,1,2,3].map(row => (
                            <div key={row} className="flex gap-0">
                              {[
                                [['R','B','R'], ['Y','R','Y'], ['R','B','R'], ['Y','R','Y']],
                                [['R','B','R'], ['Y','R','Y'], ['R','B','R'], ['B','G','B']],
                                [['R','B','R'], ['Y','R','Y'], ['G','Y','G'], ['Y','R','Y']],
                                [['R','B','R'], ['Y','R','Y'], ['G','Y','G'], ['B','G','B']],
                                [['R','B','R'], ['B','G','B'], ['R','B','R'], ['Y','R','Y']],
                                [['R','B','R'], ['B','G','B'], ['R','B','R'], ['B','G','B']],
                                [['R','B','R'], ['B','G','B'], ['G','Y','G'], ['Y','R','Y']],
                                [['R','B','R'], ['B','G','B'], ['G','Y','G'], ['B','G','B']],
                                [['G','Y','G'], ['Y','R','Y'], ['R','B','R'], ['Y','R','Y']],
                                [['G','Y','G'], ['Y','R','Y'], ['R','B','R'], ['B','G','B']],
                                [['G','Y','G'], ['Y','R','Y'], ['G','Y','G'], ['Y','R','Y']],
                                [['G','Y','G'], ['Y','R','Y'], ['G','Y','G'], ['B','G','B']],
                                [['G','Y','G'], ['B','G','B'], ['R','B','R'], ['Y','R','Y']],
                                [['G','Y','G'], ['B','G','B'], ['R','B','R'], ['B','G','B']],
                                [['G','Y','G'], ['B','G','B'], ['G','Y','G'], ['Y','R','Y']],
                                [['G','Y','G'], ['B','G','B'], ['G','Y','G'], ['B','G','B']],
                              ].slice(row * 4, (row + 1) * 4).map((patterns, index) => (
                                <div key={index} className="flex gap-0">
                                  <div className="flex gap-0">
                                    {patterns.map((pattern, letterIndex) => (
                                      <div key={letterIndex} className="flex flex-col gap-0">
                                        {pattern.map((color, i) => (
                                          <ColorSquare key={i} color={color} />
                                        ))}
                                      </div>
                                    ))}
                                  </div>
                                  {index < 3 && (
                                    <div className="flex flex-col gap-0">
                                      {['Y','Y','Y'].map((color, i) => (
                                        <ColorSquare key={i} color={color} muted={true} />
                                      ))}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center text-sm text-muted-foreground">
                    <p>One unified composition: All possible MAMAs flowing through visual space</p>
                    <p>BBB and YYY monoliths create rhythm between variations</p>
                  </div>
                  
                </div>
              )}

              {/* Special demonstration for OM */}
              {inputText.toUpperCase().includes('OM') && (
                <div className="mt-8 space-y-6">
                  <h4 className="text-center font-semibold text-lg">Word Grid: OM - Key Variations</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Major Key - touching letters */}
                    <WordGrid
                      keyType="major"
                      spacing="gap-0"
                      letters={[
                        { letter: "O", pattern: ['B', 'R', 'B'], meaning: "ember under water" },
                        { letter: "M", pattern: ['R', 'B', 'R'], meaning: "discovery pattern" },
                      ]}
                    />
                    
                    {/* Minor Key - touching letters */}
                    <WordGrid
                      keyType="minor"
                      spacing="gap-0"
                      letters={[
                        { letter: "O", pattern: ['Y', 'G', 'Y'], meaning: "life surrounded by light" },
                        { letter: "M", pattern: ['G', 'Y', 'G'], meaning: "complementary flow" },
                      ]}
                    />
                  </div>
                  
                  <div className="text-center text-sm text-muted-foreground space-y-2">
                    <p>When letters touch, their edge colors create new harmonic meanings:</p>
                    <p><span className="text-lang-yellow font-medium">Major:</span> B touches R - fire meets water in continuous flow</p>
                    <p><span className="text-lang-blue font-medium">Minor:</span> Y touches G - light merges with life energy</p>
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