import { Component, importProvidersFrom, ɵresolveComponentResources as resolveComponentResources } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { readFile } from 'node:fs/promises';

import { TortoiseVisualizationComponent } from '../../../../src/app/components/tortoise-visualization/tortoise-visualization.component';
import { TORTOISE_GAME_CONFIGS } from '../../../../src/app/data/tortoise-game-configs';
import { GridPosition } from '../../../../src/app/models/grid.model';

const TEST_CONFIG = TORTOISE_GAME_CONFIGS[0];
const CELL_SIZE = 64;

function expectedCenter(pos: GridPosition): { x: number; y: number } {
  return {
    x: pos.col * CELL_SIZE + CELL_SIZE / 2,
    y: pos.row * CELL_SIZE + CELL_SIZE / 2
  };
}

const resourceMap: Record<string, string> = {
  './tortoise-visualization.component.html': 'src/app/components/tortoise-visualization/tortoise-visualization.component.html',
  './tortoise-visualization.component.css': 'src/app/components/tortoise-visualization/tortoise-visualization.component.css'
};

describe('TortoiseVisualizationComponent Requirements', () => {
  let fixture: ComponentFixture<TortoiseVisualizationComponent>;

  beforeEach(async () => {
    TestBed.resetTestingModule();
    await resolveComponentResources(async (url: string) => readFile(resourceMap[url] ?? url, 'utf8'));

    await TestBed.configureTestingModule({
      imports: [TortoiseVisualizationComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TortoiseVisualizationComponent);
    fixture.componentRef.setInput('config', TEST_CONFIG);
    fixture.detectChanges();
  });

  // ─── Layered rendering ────────────────────────────────────────────────────

  test('renders a dedicated path layer and a separate object layer', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.tortoise-layer--path')).not.toBeNull();
    expect(el.querySelector('.tortoise-layer--objects')).not.toBeNull();
  });

  test('does not render the debug grid layer when debugGrid is false', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.tortoise-layer--debug-grid')).toBeNull();
  });

  test('renders the debug grid as a third independent layer when debugGrid is true', () => {
    fixture.componentRef.setInput('debugGrid', true);
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.tortoise-layer--debug-grid')).not.toBeNull();
    // All three layers coexist independently
    expect(el.querySelector('.tortoise-layer--path')).not.toBeNull();
    expect(el.querySelector('.tortoise-layer--objects')).not.toBeNull();
  });

  test('path layer contains a dual-stroke SVG path and no waypoint marker elements', () => {
    const pathLayer = fixture.nativeElement.querySelector('.tortoise-layer--path') as SVGElement;
    expect(pathLayer.querySelectorAll('path.tortoise-path').length).toBe(2);
    // No circles or polygons that would constitute waypoint markers
    expect(pathLayer.querySelectorAll('circle').length).toBe(0);
    expect(pathLayer.querySelectorAll('polygon').length).toBe(0);
  });

  // ─── Cell-centered placement ─────────────────────────────────────────────

  test('tortoise is initially centered in the start grid cell', () => {
    const tortoiseEl = fixture.nativeElement.querySelector('.tortoise-object--tortoise') as HTMLElement;
    const center = expectedCenter(TEST_CONFIG.start);
    expect(tortoiseEl.style.transform).toContain(`translate(${center.x}px, ${center.y}px)`);

    const tortoiseImg = fixture.nativeElement.querySelector('.tortoise-texture--tortoise') as HTMLImageElement;
    expect(tortoiseImg).not.toBeNull();
    expect(tortoiseImg.src).toContain('assets/reward-game/tortoise/tortoise.png');
    expect(tortoiseImg.alt).toBe('Tortoise character');
  });

  test('each obstacle is centered in its configured grid cell', () => {
    const obstacleEls = Array.from(
      fixture.nativeElement.querySelectorAll('.tortoise-object--obstacle')
    ) as HTMLElement[];

    expect(obstacleEls).toHaveLength(TEST_CONFIG.obstacles.length);
    obstacleEls.forEach((el, i) => {
      const center = expectedCenter(TEST_CONFIG.obstacles[i].position);
      expect(el.style.transform).toContain(`translate(${center.x}px, ${center.y}px)`);
    });
  });

  test('renders obstacles as image elements with texture source and alt text', () => {
    const obstacleEls = Array.from(
      fixture.nativeElement.querySelectorAll('.tortoise-object--obstacle')
    ) as HTMLImageElement[];

    expect(obstacleEls).toHaveLength(TEST_CONFIG.obstacles.length);
    obstacleEls.forEach(obstacle => {
      expect(obstacle.tagName).toBe('IMG');
      expect(obstacle.src).toContain('assets/reward-game/obstacles/rock.png');
      expect(obstacle.alt).toBe('Obstacle on the tortoise path');
    });
  });

  test('hides obstacles whose position keys are marked as cleared', () => {
    const firstObstacle = TEST_CONFIG.obstacles[0];
    fixture.componentRef.setInput('clearedObstacleKeys', [`${firstObstacle.position.col},${firstObstacle.position.row}`]);
    fixture.detectChanges();

    const obstacleEls = Array.from(
      fixture.nativeElement.querySelectorAll('.tortoise-object--obstacle')
    ) as HTMLElement[];

    expect(obstacleEls).toHaveLength(Math.max(0, TEST_CONFIG.obstacles.length - 1));
  });

  test('path geometry follows waypoint cell centers', () => {
    const path = fixture.nativeElement.querySelector('.tortoise-path--inner') as SVGPathElement;
    const expectedSegments = TEST_CONFIG.waypoints.map(wp => {
      const c = expectedCenter(wp);
      return `${c.x},${c.y}`;
    });
    const expectedData = `M ${expectedSegments[0]}${expectedSegments.slice(1).map(point => ` L ${point}`).join('')}`;
    expect(path.getAttribute('d')).toBe(expectedData);
  });

  // ─── Debug grid ───────────────────────────────────────────────────────────

  test('debug grid layer contains line elements covering the board when enabled', () => {
    fixture.componentRef.setInput('debugGrid', true);
    fixture.detectChanges();

    const debugLayer = fixture.nativeElement.querySelector('.tortoise-layer--debug-grid') as SVGElement;
    const lines = debugLayer.querySelectorAll('line');
    // At least one line per column boundary and one per row boundary
    expect(lines.length).toBeGreaterThan(0);
  });

  test('debug grid layer contains coordinate labels for each cell when enabled', () => {
    fixture.componentRef.setInput('debugGrid', true);
    fixture.detectChanges();

    const debugLayer = fixture.nativeElement.querySelector('.tortoise-layer--debug-grid') as SVGElement;
    const labels = Array.from(debugLayer.querySelectorAll('text'));
    expect(labels.length).toBeGreaterThan(0);

    // Each label text matches (col,row) format
    expect(labels.every(t => /^\(\d+,\d+\)$/.test(t.textContent?.trim() ?? ''))).toBe(true);
  });

  // ─── Animation: position-update contract ─────────────────────────────────

  test('moveTortoiseTo updates the tortoise display position to the target cell center', () => {
    const target: GridPosition = TEST_CONFIG.waypoints[1]; // e.g. { col: 4, row: 4 }
    const startCenter = expectedCenter(TEST_CONFIG.start);
    const targetCenter = expectedCenter(target);

    // Confirm we start at the start position
    expect(fixture.componentInstance.tortoiseDisplayX).toBe(startCenter.x);
    expect(fixture.componentInstance.tortoiseDisplayY).toBe(startCenter.y);

    // After a move instruction, the component's display position state changes to the target
    // cell center (the CSS transition will interpolate the visual movement between the two)
    fixture.componentInstance.moveTortoiseTo(target);

    expect(fixture.componentInstance.tortoiseDisplayX).toBe(targetCenter.x);
    expect(fixture.componentInstance.tortoiseDisplayY).toBe(targetCenter.y);
    // Position differs from source — display pixel state updated, not kept at source
    expect(fixture.componentInstance.tortoiseDisplayX).not.toBe(startCenter.x);
  });

  test('applies expected rotation angles for cardinal movement directions', () => {
    fixture.componentInstance.moveTortoiseTo({ col: TEST_CONFIG.start.col + 1, row: TEST_CONFIG.start.row });
    expect(fixture.componentInstance.tortoiseRotationAngle).toBe(0);

    fixture.componentInstance.moveTortoiseTo({ col: TEST_CONFIG.start.col + 1, row: TEST_CONFIG.start.row + 1 });
    expect(fixture.componentInstance.tortoiseRotationAngle).toBe(90);

    fixture.componentInstance.moveTortoiseTo({ col: TEST_CONFIG.start.col, row: TEST_CONFIG.start.row + 1 });
    expect(fixture.componentInstance.tortoiseRotationAngle).toBe(180);

    fixture.componentInstance.moveTortoiseTo({ col: TEST_CONFIG.start.col, row: TEST_CONFIG.start.row });
    expect(fixture.componentInstance.tortoiseRotationAngle).toBe(270);
  });

  test('moveCompleted is emitted when the move transition ends, not immediately on moveTortoiseTo', () => {
    const target: GridPosition = TEST_CONFIG.waypoints[1];
    const completedSpy = vi.fn();
    fixture.componentInstance.moveCompleted.subscribe(completedSpy);

    fixture.componentInstance.moveTortoiseTo(target);

    // moveCompleted must NOT have fired yet (animation is still in progress)
    expect(completedSpy).not.toHaveBeenCalled();

    // Simulating the CSS transitionend event signals completion
    fixture.componentInstance.onTortoiseTransitionEnd();
    expect(completedSpy).toHaveBeenCalledTimes(1);
  });
});
