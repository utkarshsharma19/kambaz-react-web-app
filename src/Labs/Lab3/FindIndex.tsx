
const numberArray1 = [1, 2, 4, 5, 6];
const stringArray1 = ['string1', 'string3'];

const fourIndex = numberArray1.findIndex(a => a === 4);
const string3Index = stringArray1.findIndex(a => a === 'string3');

function FindIndex() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h2>Array Index Results</h2>
      <p>Index of <code>4</code> in <code>numberArray1</code>: {fourIndex}</p>
      <p>Index of <code>'string3'</code> in <code>stringArray1</code>: {string3Index}</p>
    </div>
  );
}

export default FindIndex;