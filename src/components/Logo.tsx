export default function Logo() {
  return (
    <div className="flex flex-col items-start">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
      `}</style>
      <div className="flex items-baseline space-x-1">
        <h1
          className="text-3xl md:text-4xl font-light text-white"
          style={{ fontFamily: 'Pacifico, cursive' }}
        >
          Anthia
        </h1>
        <span className="text-xs md:text-sm font-semibold text-amber-400 tracking-widest">
          ORNAMENTS
        </span>
      </div>
      <p className="text-xs text-amber-300 tracking-wider mt-1">
        ...Occasions made better
      </p>
    </div>
  );
}
