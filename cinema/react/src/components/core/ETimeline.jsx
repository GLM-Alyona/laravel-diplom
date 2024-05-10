export default function ETimeline({ left }) {
    return (
        <>
            <span
                style={{
                    top: `60px`,
                    left: `${(left * 100) / 1620}%`,
                }}
                className="absolute h-[8px] w-[1px] border border-gray-500 rounded"
            ></span>
        </>
    );
}
