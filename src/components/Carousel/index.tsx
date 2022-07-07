import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { FC } from "react";
import { usePage } from "utils/hooks/usePage";
export interface Tile {
	imgUrl: string;
	id: number;
	uuid: string;
}
const TILE_HEIGHT = "h-36"; // set here to make buttons the same height
const Carousel: FC<{ data: Array<Tile>; header?: string }> = ({
	data,
	header,
}) => {
	const [page, addPage, subtractPage] = usePage(data.length);
	return (
		<>
			{header && (
				<h3 className="text-xl font-bold text-dimmed-always">
					{header}
				</h3>
			)}
			<div className="carousel">
				<button
					onClick={subtractPage}
					className={`buttonLeft ${TILE_HEIGHT} w-6`}
				>
					<FontAwesomeIcon icon={faAngleLeft} />
				</button>
				<div
					className="track"
					style={{ transform: `translateX(${page * -100}%)` }}
				>
					{data.map((x) => (
						<Tile data={x} key={x.uuid} />
					))}
				</div>
				<button
					onClick={addPage}
					className={`buttonRight ${TILE_HEIGHT} w-6`}
				>
					<FontAwesomeIcon icon={faAngleRight} />
				</button>
			</div>
		</>
	);
};
export default Carousel;

const Tile: React.FC<{ data: Tile }> = ({ data }) => {
	return (
		<div className="tile">
			<img
				className={`object-contain m-auto w-24 ${TILE_HEIGHT} rounded`}
				src={data.imgUrl}
				alt={data.id as unknown as string}
			/>
		</div>
	);
};
