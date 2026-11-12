"use client";

import * as React from "react";

/**
 * Keeps an editor's draft state next to a saved baseline.
 *
 * `dirty` compares the draft against the last saved snapshot, so the header can
 * honestly say whether the browser holds unsaved edits. Call `markSaved()` once
 * the server action succeeds — it adopts the current draft as the new baseline.
 */
export function useEditor<T>(initial: T) {
  const [value, setValue] = React.useState<T>(initial);
  const [baseline, setBaseline] = React.useState(() => JSON.stringify(initial));

  const dirty = JSON.stringify(value) !== baseline;

  /**
   * Adopts a draft as the new baseline. Pass `next` when the caller is also
   * replacing the draft in the same tick (a reset writes server state, so the
   * value it should compare against is not the one captured in this render).
   */
  const markSaved = React.useCallback(
    (next?: T) => {
      setBaseline(JSON.stringify(next ?? value));
    },
    [value],
  );

  return { value, setValue, dirty, markSaved };
}
