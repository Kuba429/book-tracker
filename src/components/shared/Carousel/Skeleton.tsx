import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { FC } from "react";
import { usePage } from "utils/hooks/usePage";
import { v4 } from "uuid";

const TILE_HEIGHT = "h-36"; // set here to make buttons the same height
const CarouselSkeleton: FC<{ header?: string }> = ({ header }) => {
	const data = new Array(16).fill(null).map(() => v4());
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
				<div className="overflow-hidden">
					<div
						className="track"
						style={{ transform: `translateX(${page * -100}%)` }}
					>
						{data.map((key) => (
							<div key={key} className="tile">
								<Link href={"/"}>
									<a>
										<div className="m-auto rounded w-fit h-fit bg-light-600 dark:bg-dark-600 transition-colors">
											<img
												className={`object-contain w-24 ${TILE_HEIGHT} opacity-0
									`}
											></img>
										</div>
									</a>
								</Link>
							</div>
						))}
					</div>
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
export default CarouselSkeleton;
