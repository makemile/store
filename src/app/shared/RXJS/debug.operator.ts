import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { RxJsDebug } from "src/app/models/debug.model";

let rxjsDebugLevel = RxJsDebug.INFO;

export function setRxjsDebugLevel(level: RxJsDebug) {
    rxjsDebugLevel = level;
}

export const debug = <T>
    (level: number, message: string) => (source: Observable<T>) =>
        source.pipe(
            tap((val) => {
                if (level >= rxjsDebugLevel) {
                    console.log(message + ": ", val);
                }
            })
        );
