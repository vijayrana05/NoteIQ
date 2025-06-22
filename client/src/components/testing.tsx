export function Testing() {
    return <div className="columns-1 sm:columns-2 md:columns-3 gap-4 p-4">
        <div className="break-inside-avoid mb-4 bg-blue-100 p-4 rounded shadow">
            <p>Short content block</p>
        </div>
        <div className="break-inside-avoid mb-4 bg-red-100 p-4 rounded shadow">
            <p>Medium content block<br />with some text</p>
        </div>
        <div className="break-inside-avoid mb-4 bg-green-100 p-4 rounded shadow">
            <p>Longer content block with<br />multiple lines<br />of content<br />for testing</p>
        </div>
        <div className="break-inside-avoid mb-4 bg-yellow-100 p-4 rounded shadow">
            <p>Another block</p>
        </div>
    </div>

}
export default Testing;