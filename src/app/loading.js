export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0D1D46]">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-12 h-12">
          <span className="absolute inset-0 rounded-full border-2 border-[#DF5B10]/30 animate-ping" />
          <span className="relative flex h-12 w-12 rounded-full border-2 border-[#DF5B10] items-center justify-center">
            <span
              className="font-heading font-900 text-sm leading-none"
              style={{ color: "#DF5B10", fontFamily: "League Spartan, sans-serif" }}
            >
              RDM
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
